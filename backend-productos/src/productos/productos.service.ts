import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './models/producto.schema';
import { Model } from 'mongoose';
import { CloudinaryStrategy } from 'src/storage/strategy/cloudinary.strategy';
import { Categorias } from './constants';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Producto.name) private readonly productoModel: Model<Producto>,
    private storageService: CloudinaryStrategy,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      let photoURL = null;
      if (createProductoDto.photoUrl) {
        photoURL = await this.storageService.imagetoBase64(
          createProductoDto.photoUrl,
        );
      }
      const newProduct = await this.productoModel.create({
        name: createProductoDto.name,
        precio: createProductoDto.precio,
        photoUrl: photoURL,
        description: createProductoDto.description,
        categories: createProductoDto.categories,
      });

      return newProduct;
    } catch (error) {
      console.log('error al crear un producto', error);
    }
  }

  async getCategories(value: string) {
    return this.productoModel.find({ categories: value });
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoModel.find();
  }

  async findOne(id: string) {
    return await this.productoModel.findById(id);
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const product = this.productoModel.findById(id);

    if (!product) throw new NotFoundException('Product not find');
    let photoURL = (await product).photoUrl;

    if (updateProductoDto.photoUrl) {
      photoURL = await this.storageService.imagetoBase64(
        updateProductoDto.photoUrl,
      );
    }

    const updatedProduct = {
      name: updateProductoDto.name,
      precio: updateProductoDto.precio,
      photoUrl: photoURL,
      description: updateProductoDto.description,
      categories: updateProductoDto.categories,
    };

    await this.productoModel.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });
    return updatedProduct;
  }

  async remove(id: string) {
    return await this.productoModel.findByIdAndDelete(id);
  }
}
