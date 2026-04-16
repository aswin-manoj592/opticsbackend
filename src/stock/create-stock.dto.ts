import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStockDto {

    @IsNotEmpty()
    @IsNumber()
    productId: number;   // ✅ REQUIRED

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsString()
    vendor?: string;
}
