import { MediaEntity } from '../../../../db/schema/entities';
import { CreateMediaDTO } from '../dto/create-media.dto';
import { MediaRepository } from '../media.repository';

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

export const mediaVirtualBoy: CreateMediaDTO = {
  name: 'Virtual Boy',
  acronym: 'VB',
  description: 'Red images',
  imageCoverUrl: 'red.jpg',
  imageUrls: ['1.jpg', '2.jpg'],
};

export const mediaStadia: CreateMediaDTO = {
  name: 'Stadia',
  acronym: 'S',
  description: 'Streaming games lol',
  imageCoverUrl: 'stadia.gif',
  imageUrls: ['1.jpg', '2.jpg'],
};

export const entityVirtualBoy: MediaEntity = {
  ...mediaVirtualBoy,
  id: 5,
  updated_at: null,
  created_at: new Date(),
};

export const entityStadia: MediaEntity = {
  ...mediaStadia,
  id: 9,
  updated_at: null,
  created_at: new Date(),
};
