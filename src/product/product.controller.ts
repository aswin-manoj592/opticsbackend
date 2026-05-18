import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
  UploadedFiles
} from '@nestjs/common';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BranchId } from '../common/decorators/branch-id.decorator';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // ✅ CREATE WITH IMAGE UPLOAD
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
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
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreateProductDto,
    @BranchId() branchId: number,
  ) {
    if (files && files.length > 0) {
      dto.image = files.map(file => file.filename).join(','); // save filenames comma separated in DB
    }

    // Handle form-data string conversions
    for (const key in dto) {
      if (dto[key] === '') dto[key] = null;
    }
    if (dto.cost !== null && dto.cost !== undefined) dto.cost = Number(dto.cost);
    if (dto.rate !== null && dto.rate !== undefined) dto.rate = Number(dto.rate);
    if (dto.noOfSticker !== null && dto.noOfSticker !== undefined) dto.noOfSticker = Number(dto.noOfSticker);
    if (dto.nonStock !== undefined) dto.nonStock = String(dto.nonStock) === 'true';
    if (dto.initialStock !== null && dto.initialStock !== undefined) dto.initialStock = Number(dto.initialStock);

    return this.productService.create(dto, branchId);
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
    FilesInterceptor('images', 10, {
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
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: UpdateProductDto,
  ) {
    if (files && files.length > 0) {
      dto.image = files.map(file => file.filename).join(',');
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

  // ✅ LIKE PRODUCT
  @Patch(':id/like')
  incrementLikes(@Param('id') id: number) {
    return this.productService.incrementLikes(id);
  }

  // ✅ FIND BY BARCODE
  @Get('barcode/:barcode')
  findByBarcode(@Param('barcode') barcode: string) {
    return this.productService.findByBarcode(barcode);
  }
}
