import { Injectable } from "@nestjs/common"
import { IFilmRepository } from "./film.repository.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { FilmEntity } from "./entities/film-entity"
import { Repository } from "typeorm"

@Injectable()

export class FilmRepository implements IFilmRepository {
    constructor(
       @InjectRepository(FilmEntity) private readonly filmRepository: Repository<FilmEntity>
    ){}
    
    async findFilmByTitle(title: string): Promise<FilmEntity | null> {
        const entity = await this.filmRepository.findOne({
            where:{ title }
        })

        return entity
    }

    async addFilm(
        title: string,
        description: string,
        release: Date,
        categoryId: string
      ): Promise<FilmEntity> {
      
          const film = this.filmRepository.create({
              title,
              description,
              release,
              categories: [{ id: categoryId }]
          });
      
          return await this.filmRepository.save(film);
      }
}