import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PlatformsRepository } from './platforms.repository';
import { RequestCreatePlatformDTO } from '../../../common/dto/content/create-platform.dto';
import { MediaWithPlatform } from '../../../common/types/media.types';
import { MediaService } from '../media/media.service';

@Injectable()
export class PlatformsService {
  constructor(
    private mediaService: MediaService,
    private platformsRepository: PlatformsRepository,
  ) {}

  async create(data: RequestCreatePlatformDTO): Promise<MediaWithPlatform> {
    return this.platformsRepository.create(data);
  }

  async findAll(): Promise<MediaWithPlatform[]> {
    return this.platformsRepository.findAll();
  }

  async findById(id: number): Promise<MediaWithPlatform | undefined> {
    const platform = await this.platformsRepository.findById(id);
    return platform;
  }

  async findByIdOrThrow(id: number): Promise<MediaWithPlatform> {
    const platform = await this.findById(id);
    if (!platform) throw new NotFoundException('Platform not found');
    return platform;
  }

  async updateById(id: number, data: RequestCreatePlatformDTO) {
    const platformToUpdate = await this.findByIdOrThrow(id);
    const updatedPlatform = await this.platformsRepository.updateById(
      platformToUpdate.platforms.id,
      platformToUpdate.media.id,
      data,
    );
    return updatedPlatform;
  }

  async deleteById(id: number): Promise<MediaWithPlatform> {
    const platformToDelete = await this.findByIdOrThrow(id);
    const platformUseCount =
      await this.platformsRepository.gamesPlatformCount(id);

    if (platformUseCount >= 1)
      throw new ConflictException(
        `The platform with id ${id} is used in one or more places`,
      );

    await this.mediaService.deleteById(platformToDelete.media.id);
    return platformToDelete;
  }
}
