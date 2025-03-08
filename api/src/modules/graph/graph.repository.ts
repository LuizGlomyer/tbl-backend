import { Create, Node, Param, Pattern } from '@neo4j/cypher-builder';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
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
    // const person = {
    //   name: 'name',
    //   dateOfBirth: 'dateOfBirth',
    //   createdAt: 'createdAt',
    // };
    // const queryTest = `
    //   CREATE (p:Person { name: $name, dateOfBirth: $dateOfBirth, createdAt: $createdAt })
    //   RETURN p
    // `;
    // const resultTest = await this.session.run(queryTest, person);
    // return {
    //   properties: resultTest.records.map(
    //     (record) => record.get('p').properties,
    //   ),
    //   resultTest,
    // };

    // interface t1 {
    //   a: string;
    // }

    // interface t2 extends t1 {
    //   b: string;
    // }

    // const n1: t2 = { a: '1', b: '2' };
    // const n2: t1 = n1;

    // console.log({ n1, n2 });

    // const query = 'MATCH (n) RETURN n LIMIT 10';
    const query = 'MATCH (n)-[e]->(m) RETURN n,e,m;';
    const params = {};

    const result: QueryResult<RecordShape> = await this.session.run(
      query,
      params,
    );

    return result.records.map((record) => record.toObject());
  }

  async createNode(data) {
    const { media, relationships, types } = data;
    console.log(data);
    const node = new Node();
    const pattern = new Pattern(node, { labels: types });

    let createQuery = new Create(pattern)
      .set([node.property('id'), new Param(randomUUID())])
      .set([node.property('createdAt'), new Param(new Date().toISOString())]);

    Object.keys(media).forEach((key) => {
      createQuery = createQuery.set([
        node.property(key),
        new Param(media[key]),
      ]);
    });

    const finalQuery = createQuery.return(node);

    const { cypher, params } = finalQuery.build();
    console.log({ cypher, params });
    return this.execute(cypher, params);
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
    const result: QueryResult<RecordShape> = await this.session.run(
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
