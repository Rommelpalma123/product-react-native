import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsBase64 } from 'class-validator';
import { Categorias } from '../constants';

export class CreateProductoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  precio: Number;

  @ApiProperty({ example: 'ijiIHNUiynuiGUYGUbuy' })
  @IsBase64()
  photoUrl: string;

  @ApiProperty()
  @IsEnum(Categorias)
  categories: string;
}