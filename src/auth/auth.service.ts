import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../admin/user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AdminUser)
        private userRepository: Repository<AdminUser>
    ) {}

    async login(data: any) {
        // Find user by email or name (we allow both as 'username')
        const user = await this.userRepository.findOne({
            where: [
                { email: data.username },
                { name: data.username }
            ],
            relations: ['branch']
        });

        if (!user) {
            return { message: "Invalid username or password", success: false };
        }

        if (user.password !== data.password) {
            return { message: "Invalid username or password", success: false };
        }

        if (user.status !== 'Active') {
            return { message: "User account is inactive", success: false };
        }

        return { 
            message: "Login successful", 
            success: true,
            role: user.role,
            branchId: user.branch?.id || null,
            name: user.name
        };
    }
}
