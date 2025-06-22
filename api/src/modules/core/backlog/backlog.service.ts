import { Injectable, NotFoundException } from '@nestjs/common';
import { BacklogRepository } from './backlog.repository';
import { BacklogEntity } from '../../../db/schema/entities';
import {
  CreateBacklogDTO,
  UpdateBacklogDTO,
} from '../../../common/dto/core/backlog.dto';
import { StatusService } from '../status/status.service';
import { UserMediaService } from '../user-media/user-media.service';

@Injectable()
export class BacklogService {
  constructor(
    private backlogRepository: BacklogRepository,
    private userMediaService: UserMediaService,
    private statusService: StatusService,
  ) {}

  async create(data: CreateBacklogDTO): Promise<BacklogEntity> {
    await this.userMediaService.findByIdOrThrow(data.userMediaId);
    await this.statusService.findByIdOrThrow(data.statusId);

    return this.backlogRepository.create(data);
  }

  async findAll(): Promise<BacklogEntity[]> {
    return this.backlogRepository.findAll();
  }

  async findByIdOrThrow(id: number): Promise<BacklogEntity> {
    const backlog = await this.backlogRepository.findById(id);
    if (!backlog) throw new NotFoundException('Backlog not found');
    return backlog;
  }

  async updateById(id: number, data: UpdateBacklogDTO): Promise<BacklogEntity> {
    await this.findByIdOrThrow(id);
    await this.statusService.findByIdOrThrow(data.statusId);

    return this.backlogRepository.updateById(id, data);
  }

  async deleteById(id: number): Promise<BacklogEntity | undefined> {
    const backlogToDelete = await this.findByIdOrThrow(id);
    await this.backlogRepository.deleteById(id);
    return backlogToDelete;
  }
}
