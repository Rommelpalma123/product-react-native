import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthentificacionService } from './authentificacion.service';
import { CreateAuthentificacionDto } from './dto/create-authentificacion.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IniciarSesionResponse } from './dto/autentication-response';
import { LoginAdminDto } from './dto/login';
import { AuthGuard } from './authentificacion.guard';
@ApiTags('Autentication')
@Controller('authentificacion')
export class AuthentificacionController {
  constructor(
    private readonly authentificacionService: AuthentificacionService,
  ) {}

  @ApiOkResponse({
    description: 'Registered Properly',
    type: IniciarSesionResponse,
  })
  @Post('create-admin')
  create(@Body() createAuthentificacionDto: CreateAuthentificacionDto) {
    return this.authentificacionService.createAdmin(createAuthentificacionDto);
  }

  @ApiOkResponse({
    description: 'Login success',
    type: IniciarSesionResponse,
  })
  @Post('login-admin')
  login(@Body() loginAdmin: LoginAdminDto) {
    return this.authentificacionService.loginAdmin(
      loginAdmin.email,
      loginAdmin.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('usuario-administrador')
  getAdmin() {
    return this.authentificacionService.getAdmin();
  }
}
