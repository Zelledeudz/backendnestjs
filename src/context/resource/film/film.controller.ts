import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { FilmPresenter } from "./types/film.presenter";
import { plainToInstance } from "class-transformer";
import { RcsFilmDTO } from "./types/film.dto";
import { filmService } from "./film.service"

@Controller('film')
export class filmController {
    constructor(
      private readonly filmService: filmService 
    ) {}

    @Post("add")
      async createFilm(@Body() createFilmDto: RcsFilmDTO) {
          const releaseDate = new Date(createFilmDto.release);
          return await this.filmService.createFilm(createFilmDto.title, createFilmDto.description, releaseDate, createFilmDto.category);
      }
}