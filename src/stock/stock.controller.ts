import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './create-stock.dto';
import { BranchId } from '../common/decorators/branch-id.decorator';

@Controller('stock')
export class StockController {

    constructor(private service: StockService) { }

    // ✅ GET /stock
    @Get('getAll')
    async findAll(@BranchId() branchId: number) {
        const result = await this.service.findAll(branchId);
        return {
            message: "Stock fetched successfully", result
        }

    }

    // ✅ POST /stock (optional)
    @Post('create')
    create(@Body() dto: CreateStockDto, @BranchId() branchId: number) {
        return this.service.create(dto, branchId);
    }

    // ✅ DELETE /stock/:id (optional)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}
