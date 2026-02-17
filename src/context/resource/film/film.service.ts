import { Inject, Injectable, NotFoundException } from "@nestjs/common";
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

  async updateFilmById(id: string, title?: string, description?: string, release?: Date, category?: string): Promise<FilmEntity> {
    return await this.filmRepo.updateFilm(id, title, description, release, category);
  }

  async deleteFilmById(id: string): Promise<void> {
    const film = await this.filmRepo.findFilmById(id);
    if (!film) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }
    return await this.filmRepo.deleteFilm(id);
  }

  async getFilmsByCategory(categoryId: string): Promise<FilmEntity[]> {
    return await this.filmRepo.findAllByCategory(categoryId);
  }

  async getFilmById(id: string): Promise<FilmEntity> {
    const film = await this.filmRepo.findFilmById(id);
    if (!film) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }
    return film;
  }
}