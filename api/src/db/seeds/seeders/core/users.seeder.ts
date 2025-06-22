import {
  userMario,
  userSolidSnake,
} from '../../../../../test/fixtures/user.fixtures';
import { UserResponseDto } from '../../../../common/dto/user/user-response.dto';
import { UserService } from '../../../../modules/user/user.service';
import { TABLE_USERS } from '../../../schema/tables/users';

export class UserSeeder {
  public userEntities: { mario: UserResponseDto; solidSnake: UserResponseDto } =
    { mario: {} as UserResponseDto, solidSnake: {} as UserResponseDto };
  constructor(private userService: UserService) {}

  async seed() {
    console.log(`INSERT ${TABLE_USERS}`);

    this.userEntities.mario = (await this.userService.create({
      email: userMario.email,
      password: userMario.password,
      username: userMario.username,
    }))!;
    this.userEntities.solidSnake = (await this.userService.create({
      email: userSolidSnake.email,
      password: userSolidSnake.password,
      username: userSolidSnake.username,
    }))!;
  }
}
