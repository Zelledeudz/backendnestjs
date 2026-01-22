import { FilmEntity } from "./entities/film-entity"


export const FILM_REPOSITORY = Symbol('FILM_REPOSITORY')

export interface IFilmRepository{
    findFilmByTitle(email: string): Promise<FilmEntity | null>
    addFilm(title: string, description: string, release: Date): Promise<FilmEntity> 
}