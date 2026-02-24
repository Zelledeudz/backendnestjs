import { Body, Controller, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { IsString } from 'class-validator';
import { PermissionsGuard } from 'src/core/permissions/permission.guard';
import { AuthService } from '../auth.service';
import { RequirePermission } from 'src/core/permissions/require.permission';
import { Permission } from 'src/core/permissions/permission';


export class UpdatePermissionsDto {
    @IsString()
    permissions: string; 
}

@Controller('user')
@UseGuards(PermissionsGuard)
export class UserController {
    constructor(private readonly authService: AuthService) {}

    @Patch('permissions/:id')
    @HttpCode(HttpStatus.OK)
    @RequirePermission(Permission.ADMIN_ALL)
    async updatePermissions(
        @Param('id') id: string,
        @Body() body: UpdatePermissionsDto,
    ) {
        return await this.authService.updatePermissions(id, BigInt(body.permissions));
    }
}