import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  mockNintendoSwitch,
  mockPlaystation4,
  requestVirtualBoy,
} from '../fixtures/platforms.fixtures';
import { MediaWithPlatform } from '../../src/common/types/media.types';
import { expectMediaEntity, expectMediaPartial } from './_e2e-utils';
import { RequestCreatePlatformDTO } from '../../src/common/dto/content/create-platform.dto';

describe('PlatformsController (e2e)', () => {
  let app: INestApplication;
  let platformToUpdate: MediaWithPlatform;
  let platformToDelete: MediaWithPlatform;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  function expectPlatformEntity(mock: MediaWithPlatform) {
    return expect.objectContaining({
      media: expectMediaEntity(mock.media),
      platforms: expect.objectContaining({
        mediaId: mock.media.id,
        manufacturer: mock.platforms.manufacturer,
      }),
    });
  }

  function expectPlatformPartial(mock: RequestCreatePlatformDTO) {
    return expect.objectContaining({
      media: expectMediaPartial(mock.media),
      platforms: expect.objectContaining({
        manufacturer: mock.platforms.manufacturer,
      }),
    });
  }

  test('[GET] /platforms', async () => {
    const response = await request(app.getHttpServer())
      .get('/platforms')
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expectPlatformEntity(mockPlaystation4),
        expectPlatformEntity(mockNintendoSwitch),
      ]),
    );
  });

  test('[GET(id)] /platforms', async () => {
    const response = await request(app.getHttpServer())
      .get(`/platforms/${mockPlaystation4.platforms.id}`)
      .expect(200);

    expect(response.body).toEqual(expectPlatformEntity(mockPlaystation4));
  });

  test('[POST] /platforms', async () => {
    const response1 = await request(app.getHttpServer())
      .post(`/platforms`)
      .send(requestVirtualBoy)
      .expect(201);
    const response2 = await request(app.getHttpServer())
      .post(`/platforms`)
      .send(requestVirtualBoy)
      .expect(201);

    platformToDelete = response1.body;
    platformToUpdate = response2.body;

    expect(response1.body).toEqual(expectPlatformPartial(requestVirtualBoy));
    expect(response2.body).toEqual(expectPlatformPartial(requestVirtualBoy));
  });

  test('[PUT] /platforms', async () => {
    const updatePayload: RequestCreatePlatformDTO = {
      media: {
        ...requestVirtualBoy.media,
        name: 'name edit',
        acronym: 'acronym edit',
        description: 'description edit',
      },
      platforms: {
        ...requestVirtualBoy.platforms,
        manufacturer: 'manufacturer edit',
      },
    };

    const response = await request(app.getHttpServer())
      .put(`/platforms/${platformToUpdate.platforms.id}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toEqual(expectPlatformPartial(updatePayload));
  });

  test('[DELETE(id)] /platforms', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/platforms/${platformToDelete.platforms.id}`)
      .expect(200);

    expect(response.body).toEqual(expectPlatformEntity(platformToDelete));

    await request(app.getHttpServer())
      .get(`/platforms/${platformToDelete.platforms.id}`)
      .expect(404);
  });
});
