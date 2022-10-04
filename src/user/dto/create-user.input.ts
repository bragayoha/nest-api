/* eslint-disable prettier/prettier */
import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo de name obrigatório' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Campo de email obrigatório' })
  email: string;
}
