import { Injectable, NotFoundException } from '@nestjs/common';
import { PlatformsRepository } from './platforms.repository';
import { RequestCreatePlatformDTO } from './dto/create-platform.dto';
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
    return this.platformsRepository.findById(id);
  }

  async updatePlatformById(platformId: number, data: RequestCreatePlatformDTO) {
    const platformToUpdate =
      await this.platformsRepository.findById(platformId);
    if (!platformToUpdate) throw new NotFoundException();

    const updatedPlatform = await this.platformsRepository.updatePlatformById(
      platformToUpdate.platforms.id,
      platformToUpdate.media.id,
      data,
    );
    return updatedPlatform;
  }
}
