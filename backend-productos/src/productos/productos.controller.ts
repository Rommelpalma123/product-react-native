import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiTags } from '@nestjs/swagger';
import { Producto } from './models/producto.schema';
@ApiTags('Products')
@Controller('productos')
export class ProductController {
  constructor(private readonly productosService: ProductService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    console.log(createProductoDto);
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get('categories/:category')
  async findAllByCategory(
    @Param('category') category: string,
  ): Promise<Producto[]> {
    try {
      const products = await this.productosService.getCategories(category);
      if (products.length === 0) {
        throw new NotFoundException('No products found for the given category');
      }
      return products;
    } catch (error) {
      throw new NotFoundException('Category not found');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    console.log(updateProductoDto);
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(id);
  }
}
