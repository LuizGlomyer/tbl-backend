import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { MediaEntity } from '../../../db/schema/entities';
import { MediaFiltersDTO } from '../../../common/dto/content/media.dto';

@Injectable()
export class MediaService {
  constructor(private mediaRepository: MediaRepository) {}

  async findAll(search: string | undefined): Promise<MediaEntity[]> {
    return this.mediaRepository.findAll(search);
  }

  async findByFilters(filters: MediaFiltersDTO): Promise<MediaEntity[]> {
    return this.mediaRepository.findByFilters(filters);
  }

  async findByIdOrThrow(id: number): Promise<MediaEntity> {
    const media = await this.mediaRepository.findById(id);
    if (!media) throw new NotFoundException('Media not found');
    return media;
  }

  async deleteById(id: number): Promise<MediaEntity> {
    const mediaToDelete = await this.findByIdOrThrow(id);
    await this.mediaRepository.deleteById(id);
    return mediaToDelete;
  }
}
