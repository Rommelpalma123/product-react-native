import { Prop } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateAuthentificacionDto {
  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  lastname: string;

  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  password: string;
}
