import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(data);
    const userSaved = await this.usersRepository.save(user);
    if (!userSaved)
      throw new InternalServerErrorException('Failed to create user');
    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findUserById(id);
    await this.usersRepository.update(user, { ...data });
    const userUpdated = this.usersRepository.create({ ...user, ...data });
    return userUpdated;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id);
    const deleted = await this.usersRepository.delete(user);
    if (deleted) return true;
    return false;
  }
}
