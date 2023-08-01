import { Module } from '@nestjs/common';
import { AuthentificacionService } from './authentificacion.service';
import { AuthentificacionController } from './authentificacion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Authentificacion,
  AuthentificacionSchema,
} from './models/authentificacion.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './authentificacion.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '365d' },
    }),
    MongooseModule.forFeature([
      { name: Authentificacion.name, schema: AuthentificacionSchema },
    ]),
  ],
  controllers: [AuthentificacionController],
  providers: [AuthentificacionService, AuthGuard],
  exports: [AuthentificacionService, AuthGuard],
})
export class AuthentificacionModule {}
