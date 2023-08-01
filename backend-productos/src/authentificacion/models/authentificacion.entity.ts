import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Authentificacion {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;

  @Prop({ default: 'administrador' })
  rol: string;

  @Prop({ default: false })
  userAutentication: boolean;
}

export const AuthentificacionSchema = SchemaFactory.createForClass(Authentificacion)