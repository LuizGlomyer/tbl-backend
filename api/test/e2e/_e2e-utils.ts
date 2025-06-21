import { CreateMediaDTO } from '../../src/common/dto/content/create-media.dto';
import { MediaEntity } from '../../src/db/schema/entities';

export const expectMediaEntity = (mock: MediaEntity) => {
  return expect.objectContaining({
    id: mock.id,
    name: mock.name,
    acronym: mock.acronym,
    description: mock.description,
    imageCoverUrl: mock.imageCoverUrl,
    imageUrls: mock.imageUrls,
    type: mock.type,
    created_at: expect.any(String),
    updated_at: mock.updated_at,
  });
};

export const expectMediaPartial = (mock: CreateMediaDTO) => {
  return expect.objectContaining({
    name: mock.name,
    acronym: mock.acronym,
    description: mock.description,
    imageCoverUrl: mock.imageCoverUrl,
    imageUrls: mock.imageUrls,
  });
};
