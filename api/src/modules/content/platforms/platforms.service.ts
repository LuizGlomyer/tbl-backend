import { Injectable } from '@nestjs/common';
import { PlatformsRepository } from './platforms.repository';
import { CreatePlatformDTO } from './dto/create-platform.dto';
import { MediaPlatform } from '../../../common/types/media.type';

@Injectable()
export class PlatformsService {
  constructor(private platformsRepository: PlatformsRepository) {}

  async create(data: CreatePlatformDTO): Promise<MediaPlatform> {
    return this.platformsRepository.create(data);
  }

  async findAll(): Promise<MediaPlatform[]> {
    return this.platformsRepository.findAll();
  }
}
