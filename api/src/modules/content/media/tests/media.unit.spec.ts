import { Test, TestingModule } from '@nestjs/testing';
import { MediaRepository } from '../media.repository';
import { MediaService } from '../media.service';
import { entityVirtualBoy, MediaRepositoryMock } from './media.mocks';

describe('MediaService', () => {
  let mediaService: MediaService;
  let mediaRepository: MediaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaService, MediaRepositoryMock],
    }).compile();

    mediaService = module.get<MediaService>(MediaService);
    mediaRepository = module.get<MediaRepository>(MediaRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('delete media by id', async () => {
    jest.spyOn(mediaRepository, 'deleteById');
    jest.spyOn(mediaRepository, 'findById').mockResolvedValue(entityVirtualBoy);
    await mediaService.deleteById(5);

    expect(mediaRepository.findById).toHaveBeenCalledTimes(1);
    expect(mediaRepository.findById).toHaveBeenCalledWith(5);
    expect(mediaRepository.deleteById).toHaveBeenCalledTimes(1);
    expect(mediaRepository.deleteById).toHaveBeenCalledWith(5);
  });
});
