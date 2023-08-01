import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsString, IsNotEmpty, IsNumber, IsEnum, IsBase64 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Categorias } from '../constants';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  @ApiProperty()
  //@IsNotEmpty()
  nombre: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  @IsNumber()
  precio: Number;

  @ApiProperty({ example: 'ijiIHNUiynuiGUYGUbuy' })
  //@IsBase64()
  photoUrl: string;

  @ApiProperty()
  //@IsEnum(Categorias)
  categorias: string;
}
