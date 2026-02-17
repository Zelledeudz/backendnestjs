import { FilmEntity } from "./entities/film-entity"

export const FILM_REPOSITORY = Symbol('FILM_REPOSITORY')

export interface IFilmRepository{
    findFilmByTitle(title: string): Promise<FilmEntity | null>
    findFilmById(id: string): Promise<FilmEntity | null>
    findAllByCategory(categoryId: string): Promise<FilmEntity[]>
    addFilm(title: string, description: string, release: Date, category: string): Promise<FilmEntity>
    updateFilm(id: string, title?: string, description?: string, release?: Date, categoryId?: string): Promise<FilmEntity>
    deleteFilm(id: string): Promise<void>
}