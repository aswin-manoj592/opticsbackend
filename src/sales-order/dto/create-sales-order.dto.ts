import { IsNumber, IsString, IsArray, ValidateNested, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class SalesOrderDetailsDto {
    @IsNumber()
    customerId: number;

    @IsDateString()
    date: string;

    @IsNumber()
    total: number;

    @IsNumber()
    @IsOptional()
    discount: number;

    @IsNumber()
    netTotal: number;
}

class EyePrescriptionDto {
    @IsString()
    @IsOptional()
    rightSphere: string;

    @IsString()
    @IsOptional()
    rightCylinder: string;

    @IsString()
    @IsOptional()
    leftSphere: string;

    @IsString()
    @IsOptional()
    leftCylinder: string;
}

class SalesOrderItemDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    rate: number;

    @IsNumber()
    amount: number;
}

export class CreateSalesOrderDto {
    @ValidateNested()
    @Type(() => SalesOrderDetailsDto)
    order: SalesOrderDetailsDto;

    @ValidateNested()
    @Type(() => EyePrescriptionDto)
    @IsOptional()
    eye?: EyePrescriptionDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SalesOrderItemDto)
    items: SalesOrderItemDto[];
}
