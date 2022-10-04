/* eslint-disable prettier/prettier */
import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo de name obrigatório' })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Campo de email obrigatório' })
  @IsOptional()
  email?: string;
}
