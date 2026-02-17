import { Inject, Injectable } from "@nestjs/common";
import { FILM_REPOSITORY } from "./film.repository.interface";
import type { IFilmRepository } from "./film.repository.interface"
import { FilmEntity } from "./entities/film-entity";


@Injectable()
export class filmService {
  constructor(
    @Inject(FILM_REPOSITORY) private readonly filmRepo: IFilmRepository
  ){}

  async createFilm(title: string, description: string, release: Date, category: string): Promise<FilmEntity> {
    return await this.filmRepo.addFilm(title, description, release, category);
    
}
}