import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // ✅ CREATE WITH IMAGE UPLOAD
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueName}${ext}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    if (file) {
      dto.image = file.filename; // ✅ save filename in DB
    }

    // Handle form-data string conversions
    for (const key in dto) {
      if (dto[key] === '') dto[key] = null;
    }
    if (dto.cost !== null && dto.cost !== undefined) dto.cost = Number(dto.cost);
    if (dto.rate !== null && dto.rate !== undefined) dto.rate = Number(dto.rate);
    if (dto.noOfSticker !== null && dto.noOfSticker !== undefined) dto.noOfSticker = Number(dto.noOfSticker);
    if (dto.nonStock !== undefined) dto.nonStock = String(dto.nonStock) === 'true';

    return this.productService.create(dto);
  }

  // ✅ GET ALL
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // ✅ GET BY ID (add this if not present)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // ✅ UPDATE (with optional image)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueName}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateProductDto,
  ) {
    if (file) {
      dto.image = file.filename;
    }

    // Handle form-data string conversions
    for (const key in dto) {
      if (dto[key] === '') dto[key] = null;
    }
    if (dto.cost !== null && dto.cost !== undefined) dto.cost = Number(dto.cost);
    if (dto.rate !== null && dto.rate !== undefined) dto.rate = Number(dto.rate);
    if (dto.noOfSticker !== null && dto.noOfSticker !== undefined) dto.noOfSticker = Number(dto.noOfSticker);
    if (dto.nonStock !== undefined) dto.nonStock = String(dto.nonStock) === 'true';

    return this.productService.update(id, dto);
  }

  // ✅ DELETE
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }

  // ✅ FIND BY BARCODE
  @Get('barcode/:barcode')
  findByBarcode(@Param('barcode') barcode: string) {
    return this.productService.findByBarcode(barcode);
  }
}
