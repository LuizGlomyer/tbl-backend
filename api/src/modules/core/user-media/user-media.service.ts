import { Injectable, NotFoundException } from '@nestjs/common';
import { UserMediaRepository } from './user-media.repository';
import { UserMediaEntity } from '../../../db/schema/entities';
import { UserMediaDTO } from '../../../common/dto/core/user-media.dto';
import { MediaService } from '../../content/media/media.service';
import { UserService } from '../../user/user.service';
import { plainToInstance } from 'class-transformer';
import { validateDto } from '../../../common/dto/validator';

@Injectable()
export class UserMediaService {
  constructor(
    private userMediaRepository: UserMediaRepository,
    private mediaService: MediaService,
    private userService: UserService,
  ) {}

  async findByPrimaryKeyOrElseCreate(
    data: UserMediaDTO,
  ): Promise<UserMediaEntity> {
    const result = await this.userMediaRepository.findByPrimaryKey(
      data.userId,
      data.mediaId,
    );

    if (result) return result;
    return this.create(data);
  }

  async create(data: UserMediaDTO): Promise<UserMediaEntity> {
    const userMediaDto = plainToInstance(UserMediaDTO, data);
    await validateDto(userMediaDto);
    await this.userService.findByIdOrThrow(data.userId);
    await this.mediaService.findByIdOrThrow(data.mediaId);

    return this.userMediaRepository.create(data);
  }

  async findAll(): Promise<UserMediaEntity[]> {
    return this.userMediaRepository.findAll();
  }

  async findByPrimaryKeyOrThrow(
    params: UserMediaDTO,
  ): Promise<UserMediaEntity> {
    const userMedia = await this.userMediaRepository.findByPrimaryKey(
      params.userId,
      params.mediaId,
    );
    if (!userMedia) throw new NotFoundException();
    return userMedia;
  }
}
