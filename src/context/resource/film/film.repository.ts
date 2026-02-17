import { Injectable } from "@nestjs/common"
import { IFilmRepository } from "./film.repository.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { FilmEntity } from "./entities/film-entity"
import { Repository } from "typeorm"
import { RcsCategoryEntity } from "../category/entities/category-entity"

@Injectable()
export class FilmRepository implements IFilmRepository {
    constructor(
       @InjectRepository(FilmEntity) 
       private readonly filmRepository: Repository<FilmEntity>,
       
       @InjectRepository(RcsCategoryEntity)
       private readonly categoryRepository: Repository<RcsCategoryEntity>
    ){}
    
    async findFilmByTitle(title: string): Promise<FilmEntity | null> {
        const entity = await this.filmRepository.findOne({
            where: { title },
            relations: ['categories']
        })
        return entity
    }

    async findFilmById(id: string): Promise<FilmEntity | null> {
        const entity = await this.filmRepository.findOne({
            where: { id },
            relations: ['categories']
        })
        return entity
    }

    async findAllByCategory(categoryId: string): Promise<FilmEntity[]> {
        return await this.filmRepository
            .createQueryBuilder('film')
            .leftJoinAndSelect('film.categories', 'category')
            .where('category.id = :categoryId', { categoryId })
            .getMany()
    }

    async addFilm(
        title: string,
        description: string,
        release: Date,
        categoryId: string
    ): Promise<FilmEntity> {
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId }
        });
        
        if (!category) {
            throw new Error('Category not found');
        }

        const film = this.filmRepository.create({
            title,
            description,
            release,
            categories: [category]
        });
        
        return await this.filmRepository.save(film);
    }

    async updateFilm(
        id: string, 
        title?: string, 
        description?: string, 
        release?: Date, 
        categoryId?: string
    ): Promise<FilmEntity> {
        const film = await this.findFilmById(id);
        
        if (!film) {
            throw new Error('Film not found');
        }

        if (title) film.title = title;
        if (description) film.description = description;
        if (release) film.release = release;
        
        if (categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: categoryId }
            });
            
            if (!category) {
                throw new Error('Category not found');
            }
            
            film.categories = [category];
        }

        return await this.filmRepository.save(film);
    }

    async deleteFilm(id: string): Promise<void> {
        await this.filmRepository.delete(id);
    }
}