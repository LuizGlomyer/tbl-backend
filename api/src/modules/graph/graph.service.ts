import { Injectable, NotFoundException } from '@nestjs/common';
import { GraphRepository } from './graph.repository';
import { Media, Relationship } from './schemas/common';
import { randomUUID } from 'crypto';

@Injectable()
export class GraphService {
  constructor(private graphRepository: GraphRepository) {}

  async getAllNodesWithRelationships() {
    return this.graphRepository.getAllNodesWithRelationships();
  }

  async getNodeById(id: string) {
    return this.graphRepository.getNodeById(id);
  }

  async deleteNodeById(id: string) {
    const node = await this.getNodeById(id);
    console.log(node);
    if (!node) throw new NotFoundException();
    return this.graphRepository.deleteNodeById(node.id);
  }

  async create(data) {
    const newNodeId = randomUUID();
    await this.graphRepository.createNode(data, newNodeId);
    data.relationships.forEach(async (rel) => {
      await this.graphRepository.createRelationship(rel, newNodeId);
    });
    // return;

    // const queryBuilder = new CypherQueryBuilder();
    // queryBuilder.createNode('User', data, 'n');
    // queryBuilder.createNode('User', { name: 'zé' }, 'n1');
    // queryBuilder.returnSingleNode('n');
    // const { query, params } = queryBuilder.build();

    // console.log(queryBuilder.build());

    // return this.graphRepository.execute(query, params);
    //return this.graphRepository.create(data);
    // return this.graphRepository.createNode('Person', {
    //   name: data.user,
    //   age: 26,
    //   dateOfBirth: '20/01/1999',
    // });
  }
}
