import Cypher, {
  Create,
  eq,
  Match,
  Node,
  Param,
  Pattern,
  Relationship,
  Return,
} from '@neo4j/cypher-builder';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import neo4j, { Driver, QueryResult, RecordShape, Session } from 'neo4j-driver';

export interface GraphNode {
  id: string;
  type: string;
  [key: string]: any;
}

@Injectable()
export class GraphRepository implements OnModuleInit, OnModuleDestroy {
  private driver: Driver;
  private session: Session;

  constructor() {
    this.driver = neo4j.driver('bolt://localhost:7687');
    this.session = this.driver.session();
  }

  async onModuleInit() {
    console.log('Memgraph connection initialized');
  }

  async onModuleDestroy() {
    console.log('Memgraph connection closed');
  }

  async getAllNodesWithRelationships() {
    const query = 'MATCH (n)-[e]->(m) RETURN n,e,m;';
    const params = {};

    const result: QueryResult<RecordShape> = await this.session.run(
      query,
      params,
    );

    return result.records.map((record) => record.toObject());
  }

  async createNode(data, newNodeId: string) {
    const { node } = data;
    console.log({ node });
    const timestamp: string = new Date().toISOString();
    console.log(data);
    const newNode = new Node();
    const nodePattern = new Pattern(newNode, { labels: node.labels });

    let createQuery = new Create(nodePattern)
      .set([newNode.property('id'), new Param(newNodeId)])
      .set([newNode.property('createdAt'), new Param(timestamp)]);

    Object.keys(node.properties).forEach((key) => {
      createQuery = createQuery.set([
        newNode.property(key),
        new Param(node.properties[key]),
      ]);
    });

    const finalQuery = createQuery.return(newNode);

    const { cypher, params } = finalQuery.build();
    console.log('\n\nfinal query');
    console.log(finalQuery.toString());
    console.log({ cypher, params });
    return this.execute(cypher, params);
  }

  async createRelationship(rel, newNodeId: string) {
    console.log(rel);
    const sourceNode = new Node();
    const queryParts: Cypher.Clause[] = [];

    queryParts.push(
      new Match(new Pattern(sourceNode)).where(
        eq(sourceNode.property('id'), new Param(newNodeId)),
      ),
    );

    const targetNode = new Node();
    const targetPattern = new Pattern(targetNode, { labels: rel.nodeLabels });

    queryParts.push(
      new Match(targetPattern).where(
        eq(targetNode.property('id'), new Param(rel.targetId)),
      ),
    );

    const relationship = new Relationship();
    const relationshipPattern = new Pattern(sourceNode)
      .related(relationship, { type: rel.type })
      .to(targetNode);

    const createRel = new Create(relationshipPattern);

    if (rel.properties) {
      Object.keys(rel.properties).forEach((key) => {
        createRel.set([
          relationship.property(key),
          new Param(rel.properties[key]),
        ]);
      });
    }

    queryParts.push(createRel);
    queryParts.push(new Return(sourceNode));
    const query = Cypher.utils.concat(...queryParts);

    const { cypher, params } = query.build();
    console.log({ cypher, params });

    return await this.execute(cypher, params);
  }

  // async createNode(type: string, properties: Omit<GraphNode, 'id' | 'type'>) {
  //   const propertyParams = Object.keys(properties)
  //     .map((key) => `${key}: $${key}`)
  //     .join(', ');

  //   const query = `
  //     CREATE (n:${type} { id: randomUUID(), createdAt: timestamp(), ${propertyParams} })
  //     RETURN n
  //   `;

  //   const result = await this.session.run(query, { ...properties });
  //   return result.records.map((record) => record.get('n').properties);
  // }

  bCreateNode(type: string, properties: any, handle: string) {
    const propertyParams = Object.keys(properties)
      .map((key) => `${key}: $${key}`)
      .join(', ');
    return `CREATE (${handle}:${type} { id: randomUUID(), createdAt: timestamp(), ${propertyParams} })`;
  }

  bReturnSingleNode(handle: string) {
    return `RETURN ${handle}`;
  }

  async execute(query: string, properties) {
    const session = this.driver.session();

    const result: QueryResult<RecordShape> = await session.run(
      query,
      properties,
    );
    return result.records.map((record) => record.toObject());
  }

  async getNodesByType(type: string) {
    const query = `MATCH (n:${type}) RETURN n`;
    const result = await this.session.run(query);
    return result.records.map((record) => record.get('n').properties);
  }

  async getNodeById(id: string) {
    const query = `MATCH (n {id: $id}) RETURN n`;
    const result = await this.session.run(query, { id });
    return result.records.length > 0
      ? result.records[0].get('n').properties
      : null;
  }

  async deleteNodeById(id: string) {
    const query = `MATCH (n {id: $id}) DELETE n`;
    await this.session.run(query, { id });
  }
}
