import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { FilmPresenter } from "./types/film.presenter";
import { plainToInstance } from "class-transformer";
import { RcsFilmDTO } from "./types/film.dto";
import { UpdateFilmDTO } from "./types/film.dto";
import { filmService } from "./film.service"

@Controller('film')
export class filmController {
    constructor(
      private readonly filmService: filmService 
    ) {}

    @Post("add")
    async createFilm(@Body() createFilmDto: RcsFilmDTO) {
        const releaseDate = new Date(createFilmDto.release);
        return await this.filmService.createFilm(
            createFilmDto.title, 
            createFilmDto.description, 
            releaseDate, 
            createFilmDto.category
        );
    }

    @Get("category/:categoryId")
    async getFilmsByCategory(@Param('categoryId') categoryId: string) {
        return await this.filmService.getFilmsByCategory(categoryId);
    }

    @Get(":id")
    async getFilmById(@Param('id') id: string) {
        return await this.filmService.getFilmById(id);
    }

    @Patch("update/:id")
    async updateFilm(
        @Param('id') id: string,
        @Body() updateFilmDto: UpdateFilmDTO
    ) {
        const releaseDate = updateFilmDto.release ? new Date(updateFilmDto.release) : undefined;
        return await this.filmService.updateFilmById(
            id,
            updateFilmDto.title,
            updateFilmDto.description,
            releaseDate,
            updateFilmDto.category
        );
    }

    @Delete("delete/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteFilm(@Param('id') id: string) {
        return await this.filmService.deleteFilmById(id);
    }
}