import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCredentialsEntity } from "src/context/auth/entities/user-credentials-entity";
import { FilmEntity } from "./entities/film-entity";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(UserCredentialsEntity)
        private readonly userRepo: Repository<UserCredentialsEntity>,

        @InjectRepository(FilmEntity)
        private readonly filmRepo: Repository<FilmEntity>,
    ) {}

    async addFavorite(userId: string, filmId: string): Promise<UserCredentialsEntity> {
        const user = await this.userRepo.findOne({ 
            where: { id: userId }, 
            relations: ['favoriteFilms'] 
        });
        if (!user) throw new NotFoundException(`User ${userId} not found`);

        const film = await this.filmRepo.findOne({ where: { id: filmId } });
        if (!film) throw new NotFoundException(`Film ${filmId} not found`);

        // Ajouter aux favoris si pas déjà présent
        if (!user.favoriteFilms.some(f => f.id === film.id)) {
            user.favoriteFilms.push(film);
            await this.userRepo.save(user);
        }

        return user;
    }

    async removeFavorite(userId: string, filmId: string): Promise<UserCredentialsEntity> {
        const user = await this.userRepo.findOne({ 
            where: { id: userId }, 
            relations: ['favoriteFilms'] 
        });
        if (!user) throw new NotFoundException(`User ${userId} not found`);

        user.favoriteFilms = user.favoriteFilms.filter(f => f.id !== filmId);
        await this.userRepo.save(user);

        return user;
    }

    async getFavorites(userId: string): Promise<FilmEntity[]> {
        const user = await this.userRepo.findOne({ 
            where: { id: userId }, 
            relations: ['favoriteFilms'] 
        });
        if (!user) throw new NotFoundException(`User ${userId} not found`);

        return user.favoriteFilms;
    }
}