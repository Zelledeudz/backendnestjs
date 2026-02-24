import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class RcsFilmDTO {
    @ApiProperty({ example: 'Inception' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Action, Sci-Fi' })
    @IsString()
    description: string;

    @ApiProperty({ example: '2010-07-16' })
    @IsDateString()
    release: Date;

    @ApiProperty({ example: 'Science Fiction' })
    @IsString()
    category: string;
}

export class UpdateFilmDTO {
    @ApiPropertyOptional({ example: 'Inception 2' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ example: 'Sequel to Inception' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: '2025-07-16' })
    @IsOptional()
    @IsDateString()
    release?: Date;

    @ApiPropertyOptional({ example: 'Science Fiction' })
    @IsOptional()
    @IsString()
    category?: string;
}