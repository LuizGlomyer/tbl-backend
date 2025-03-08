import { Injectable, NotFoundException } from '@nestjs/common';
import { GraphRepository } from './graph.repository';
import { Media, Relationship } from './schemas/common';

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

  async create(data: Media) {
    return await this.graphRepository.createNode(data);

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
