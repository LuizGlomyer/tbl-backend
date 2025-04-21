import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { MediaEntity } from '../../../db/schema/entities';

@Injectable()
export class MediaService {
  constructor(private mediaRepository: MediaRepository) {}

  async findByIdOrThrow(id: number): Promise<MediaEntity> {
    const media = await this.mediaRepository.findById(id);
    if (!media) throw new NotFoundException();
    return media;
  }

  async deleteById(id: number): Promise<MediaEntity> {
    const mediaToDelete = await this.mediaRepository.findById(id);
    if (!mediaToDelete) throw new NotFoundException();
    return this.mediaRepository.deleteById(id);
  }
}
