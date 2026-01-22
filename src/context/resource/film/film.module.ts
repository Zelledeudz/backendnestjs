import { Module } from '@nestjs/common';
import { filmController } from './film.controller';
import { filmService } from './film.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './entities/film-entity';
import { FilmRepository } from './film.repository';
import { FILM_REPOSITORY } from './film.repository.interface';


@Module({
    imports:[
        TypeOrmModule.forFeature([
            FilmEntity
        ])
    ],
    controllers: [filmController],
    providers: [filmService, {provide: FILM_REPOSITORY, useClass: FilmRepository}],
    exports:[]
})
export class filmModule {}