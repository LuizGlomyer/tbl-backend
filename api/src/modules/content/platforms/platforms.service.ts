import { Injectable, NotFoundException } from '@nestjs/common';
import { PlatformsRepository } from './platforms.repository';
import { RequestCreatePlatformDTO } from '../../../common/dto/create-platform.dto';
import { MediaWithPlatform } from '../../../common/types/media.type';

@Injectable()
export class PlatformsService {
  constructor(private platformsRepository: PlatformsRepository) {}

  async create(data: RequestCreatePlatformDTO): Promise<MediaWithPlatform> {
    return this.platformsRepository.create(data);
  }

  async findAll(): Promise<MediaWithPlatform[]> {
    return this.platformsRepository.findAll();
  }

  async findById(id: number): Promise<MediaWithPlatform> {
    const platform = await this.platformsRepository.findById(id);
    return platform;
  }

  async findByIdOrThrow(id: number): Promise<MediaWithPlatform> {
    const platform = await this.findById(id);
    if (!platform) throw new NotFoundException();
    return platform;
  }

  async updatePlatformById(platformId: number, data: RequestCreatePlatformDTO) {
    const platformToUpdate = await this.findByIdOrThrow(platformId);
    const updatedPlatform = await this.platformsRepository.updateById(
      platformToUpdate.platforms.id,
      platformToUpdate.media.id,
      data,
    );
    return updatedPlatform;
  }
}
