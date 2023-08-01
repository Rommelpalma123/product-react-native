import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthentificacionDto } from './dto/create-authentificacion.dto';
import { Authentificacion } from './models/authentificacion.entity';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthentificacionService {
  constructor(
    @InjectModel(Authentificacion.name)
    private readonly autenticationModel: Model<Authentificacion>,
    private tokenService: JwtService,
  ) {}

  async loginAdmin(email: string, password: string) {
    const userAdmin = await this.autenticationModel.findOne({ email: email });
    const isMatch = await compare(password, userAdmin.password);

    if (!isMatch) {
      console.log('user and password incorrect');
    }
    const { _id, rol } = userAdmin;

    const token = await this.tokenService.signAsync({ _id, rol });
    return { userAdmin, token };
  }

  async createAdmin(createAuthentificacionDto: CreateAuthentificacionDto) {
    const onlyOneUserAuth = await this.autenticationModel.findOne({
      userAutentication: true,
    });
    if (onlyOneUserAuth) {
      throw new NotFoundException(
        'It is not possible to register another user',
      );
    }
    createAuthentificacionDto.password = await hash(
      createAuthentificacionDto.password,
      10,
    );

    const newUser = await this.autenticationModel.create({
      ...createAuthentificacionDto,
      userAutentication: true,
    });

    const { _id, rol } = newUser;
    const token = await this.tokenService.signAsync({ _id, rol });

    return { createAuthentificacionDto, token };
  }

  async getAdmin(): Promise<Authentificacion[]> {
    return await this.autenticationModel.find({ rol: 'administrador' });
  }
}
