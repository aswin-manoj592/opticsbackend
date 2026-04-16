import { IsNumber, IsString, IsArray, ValidateNested, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class SaleItemDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    rate: number;

    @IsNumber()
    @IsOptional()
    tax: number;

    @IsNumber()
    amount: number;
}

export class CreateSalesDto {
    @IsNumber()
    customerId: number;

    @IsString()
    invoiceNo: string;

    @IsString()
    paymentMode: string;

    @IsDateString()
    date: string;

    @IsNumber()
    total: number;

    @IsNumber()
    @IsOptional()
    discount: number;

    @IsNumber()
    @IsOptional()
    netTotal: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaleItemDto)
    items: SaleItemDto[];
}
