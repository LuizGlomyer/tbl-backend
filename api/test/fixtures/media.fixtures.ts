import { MediaEntity } from '../../src/db/schema/entities';

export const genericMediaMock: MediaEntity = {
  id: 1,
  name: 'Media',
  type: 'test',
  acronym: 'M',
  description: 'Media',
  imageCoverUrl: 'm.gif',
  imageUrls: ['1.jpg', '2.jpg'],
  created_at: new Date(),
  updated_at: null,
};
