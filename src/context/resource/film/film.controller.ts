import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { RcsFilmDTO } from "./types/film.dto";
import { UpdateFilmDTO } from "./types/film.dto";
import { filmService } from "./film.service"
import { PermissionsGuard } from "src/core/permissions/permission.guard";
import { RequirePermission } from "src/core/permissions/require.permission";
import { Permission } from "src/core/permissions/permission";
import { FavoriteService } from "./favorite.service";
import { JwtAuthGuard } from "src/context/auth/jwt-auth.guard";

@Controller('film')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class filmController {
    constructor(
      private readonly filmService: filmService,
      private readonly favoriteService: FavoriteService
    ) {}

    @Post("add")
    @RequirePermission(Permission.USER_READ)
    async createFilm(@Body() createFilmDto: RcsFilmDTO) {
        const releaseDate = new Date(createFilmDto.release);
        return await this.filmService.createFilm(
            createFilmDto.title, 
            createFilmDto.description, 
            releaseDate, 
            createFilmDto.category
        );
    }

    @Get("category/:categoryId")
    @RequirePermission(Permission.USER_READ)
    async getFilmsByCategory(@Param('categoryId') categoryId: string) {
        return await this.filmService.getFilmsByCategory(categoryId);
    }

    @Get(":id")
    @RequirePermission(Permission.USER_READ)
    async getFilmById(@Param('id') id: string) {
        return await this.filmService.getFilmById(id);
    }

    @Patch("update/:id")
    @RequirePermission(Permission.USER_READ)
    async updateFilm(
        @Param('id') id: string,
        @Body() updateFilmDto: UpdateFilmDTO
    ) {
        const releaseDate = updateFilmDto.release ? new Date(updateFilmDto.release) : undefined;
        return await this.filmService.updateFilmById(
            id,
            updateFilmDto.title,
            updateFilmDto.description,
            releaseDate,
            updateFilmDto.category
        );
    }

    @Delete("delete/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @RequirePermission(Permission.USER_READ)
    async deleteFilm(@Param('id') id: string) {
        return await this.filmService.deleteFilmById(id);
    }

    @Post("add/favoris/:filmId")
    async addFavorite(@Param('filmId') filmId: string, @Req() req) {
    const userId = req.user.id;
    const toto = await this.favoriteService.addFavorite(userId, filmId);
    console.log(toto)

    return toto
}
}