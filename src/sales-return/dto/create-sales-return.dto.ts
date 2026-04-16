import { IsNumber, IsString, IsArray, ValidateNested, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class SalesReturnItemDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    rate: number;

    @IsNumber()
    amount: number;
}

export class CreateSalesReturnDto {
    @IsNumber()
    customerId: number;

    @IsNumber()
    @IsOptional()
    saleId: number;

    @IsDateString()
    date: string;

    @IsNumber()
    total: number;

    @IsString()
    @IsOptional()
    reason: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SalesReturnItemDto)
    items: SalesReturnItemDto[];
}
