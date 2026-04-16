import { Controller, Post, Body } from '@nestjs/common';
import { BulkMessageService } from './bulk-message.service';

@Controller('tools/bulk-message')
export class BulkMessageController {
    constructor(private readonly bulkMessageService: BulkMessageService) {}

    @Post('send')
    sendMessage(@Body() payload: { customerIds: number[], message: string }) {
        return this.bulkMessageService.sendMessage(payload);
    }
}
