import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusRepository } from './status.repository';
import { StatusEntity } from '../../../db/schema/entities';

@Injectable()
export class StatusService {
  constructor(private statusRepository: StatusRepository) {}

  async findAll(): Promise<StatusEntity[]> {
    return this.statusRepository.findAll();
  }

  async findByIdOrThrow(id: number): Promise<StatusEntity> {
    const status = await this.statusRepository.findById(id);
    if (!status) throw new NotFoundException('Status not found');
    return status;
  }
}
