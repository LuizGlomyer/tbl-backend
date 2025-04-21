import { MediaEntity } from '../../src/db/schema/entities';
import { MediaRepository } from '../../src/modules/content/media/media.repository';

export const MediaRepositoryMock: {
  provide: typeof MediaRepository;
  useValue: Partial<MediaRepository>;
} = {
  provide: MediaRepository,
  useValue: {
    createWithTransaction: jest.fn(),
    updatePlatformWithTransaction: jest.fn(),
    findById: jest.fn(),
    deleteById: jest.fn(),
  },
};

export const genericMedia: MediaEntity = {
  id: 1,
  name: 'Media',
  acronym: 'M',
  description: 'Media',
  imageCoverUrl: 'm.gif',
  imageUrls: ['1.jpg', '2.jpg'],
  created_at: new Date(),
  updated_at: null,
};
