import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './entities/film-entity';
import { RcsCategoryEntity } from '../category/entities/category-entity';
import { FilmRepository } from './film.repository';
import { FILM_REPOSITORY } from './film.repository.interface';
import { filmController } from './film.controller';
import { filmService } from './film.service';
import { FavoriteService } from './favorite.service';
import { UserCredentialsEntity } from 'src/context/auth/entities/user-credentials-entity';
import { AuthModule } from 'src/context/auth/auth.module';
import { TokenJWTService } from 'src/context/auth/token-JWT.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([FilmEntity, UserCredentialsEntity, RcsCategoryEntity]),
      ],
    controllers: [filmController],
    providers: [
        filmService,
        FavoriteService,
        UserCredentialsEntity,
        TokenJWTService,
        AuthModule,
        {
            provide: FILM_REPOSITORY, 
            useClass: FilmRepository
        }
    ],
    exports:[]
})
export class filmModule {}