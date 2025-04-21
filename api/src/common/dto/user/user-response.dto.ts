import { UserEntity } from '../../../db/schema/entities';

export class UserResponseDto {
  id: number;
  username: string;
  email: string;
  updated_at: Date | null;
  created_at: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.updated_at = user.updated_at;
    this.created_at = user.created_at;
  }

  static from(user?: UserEntity): UserResponseDto | undefined {
    return user ? new UserResponseDto(user) : undefined;
  }

  static fromList(users: UserEntity[]): UserResponseDto[] {
    return users.map((user) => new UserResponseDto(user));
  }
}
