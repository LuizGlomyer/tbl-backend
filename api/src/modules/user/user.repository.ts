import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { DrizzleService } from '../drizzle/drizzle.service';
import { Users } from '../../db/schema/entities/users';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { UpdateUsenameDTO } from './dto/update-username.dto';
import { DatabaseSchema } from '../../db/schema/schema';
import { UserEntity } from '../../db/schema/entities';

@Injectable()
export class UserRepository {
  constructor(private database: DrizzleService) {}

  private get db(): NodePgDatabase<typeof DatabaseSchema> {
    return this.database.getDatabase();
  }

  async create(data: CreateUserDTO): Promise<UserEntity> {
    const user: typeof Users.$inferInsert = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    const [newUser] = await this.db.insert(Users).values(user).returning();

    return newUser;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.db.select().from(Users);
  }

  async findById(id: number): Promise<UserEntity> {
    return this.db.query.Users.findFirst({
      where: eq(Users.id, id),
    });
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.db.query.Users.findFirst({
      where: eq(Users.username, username),
    });
  }

  async updateUsernameById(
    id: number,
    data: UpdateUsenameDTO,
  ): Promise<UserEntity> {
    const [updatedUsername] = await this.db
      .update(Users)
      .set({ username: data.username })
      .where(eq(Users.id, id))
      .returning();

    return updatedUsername;
  }

  async deleteById(id: number) {
    return this.db.delete(Users).where(eq(Users.id, id)).returning();
  }
}
