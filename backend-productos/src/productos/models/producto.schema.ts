import { Prop, SchemaFactory,  Schema } from '@nestjs/mongoose'
import { Categorias } from '../constants'

@Schema()
export class Producto {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    default: null,
  })
  photoUrl: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  precio: Number;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;

  @Prop({
    required: true,
    enum: Categorias,
  })
  categories: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);