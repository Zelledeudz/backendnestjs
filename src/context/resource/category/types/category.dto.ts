import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RcsCategoryDTO {
    @ApiProperty({ example: 'Action' })
    @IsString()
    nameCategory: string;
}

export class UpdateCategoryDTO {
    @ApiPropertyOptional({ example: 'Comedy' })
    @IsString()
    nameCategory?: string;
}