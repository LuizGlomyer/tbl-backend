import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { MediaEntity } from '../../../db/schema/entities';

@Injectable()
export class MediaService {
  constructor(private mediaRepository: MediaRepository) {}

  async findById(id: number): Promise<MediaEntity> {
    return this.mediaRepository.findById(id);
  }

  async deleteById(id: number): Promise<MediaEntity> {
    const mediaToDelete = await this.mediaRepository.findById(id);
    if (!mediaToDelete) throw new NotFoundException();
    return this.mediaRepository.deleteById(id);
  }
}
