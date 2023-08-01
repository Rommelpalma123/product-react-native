import { Module } from '@nestjs/common';
import { ProductService } from './productos.service';
import { ProductController } from './productos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './models/producto.schema';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    StorageModule,
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
