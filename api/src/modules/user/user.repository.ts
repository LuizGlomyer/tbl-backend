import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { DrizzleService } from '../drizzle/drizzle.service';
import { Users } from '../../db/schema/users';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';

@Injectable()
export class UserRepository {
  constructor(private database: DrizzleService) {}

  private get db(): NodePgDatabase {
    return this.database.getDatabase();
  }

  async create(data: CreateUserDTO) {
    try {
      const user: typeof Users.$inferInsert = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      await this.db.insert(Users).values(user);
      console.log('New user created!');

      const [newUser] = await this.db
        .select()
        .from(Users)
        .where(eq(Users.email, data.email));

      return newUser;
    } catch (error) {
      if (error instanceof DatabaseError && error.code === '23505') {
        // TODO log error
        return {
          success: false,
          errorMessage: error.message,
          errorDetail: error.detail,
        };
      }
    }
  }

  async findAll() {
    // TODO handle error
    return this.db.select().from(Users);
  }

  async findById(id: number) {
    return this.db.select().from(Users).where(eq(Users.id, id));
  }

  async deleteById(id: number) {
    return this.db.delete(Users).where(eq(Users.id, id)).returning();
  }
}
