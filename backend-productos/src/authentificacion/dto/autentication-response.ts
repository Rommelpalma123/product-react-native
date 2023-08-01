import { ApiProperty } from '@nestjs/swagger';

export class AutenticationResponse {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  rol: string;
  
}

export class IniciarSesionResponse {
  @ApiProperty({ type: String, default: 'LJNIUhuyGUYBUYG' })
  token: string;

  @ApiProperty({ type: AutenticationResponse })
  usuario: AutenticationResponse;
}
