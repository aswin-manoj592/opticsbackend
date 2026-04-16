import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: any, @Res() res: any) {
        const result = await this.authService.login(body);
        
        if (!result.success) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: result.message });
        }

        return res.status(HttpStatus.OK).json({
            role: result.role,
            branchId: result.branchId,
            name: result.name,
            message: result.message
        });
    }
}
