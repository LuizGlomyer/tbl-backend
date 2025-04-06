import { Injectable } from '@nestjs/common';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(private mediaRepository: MediaRepository) {}

  create(data) {}
}
