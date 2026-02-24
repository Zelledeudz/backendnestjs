import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RcsCategoryEntity } from "./entities/category-entity";
import { categoryController } from "./category.controller";
import { categoryService } from "./category.service";
import { CATEGORY_REPOSITORY } from "./category.repository.interface";
import { CategoryRepository } from "./category.repository";

@Module({   
    imports:[
        TypeOrmModule.forFeature([
            RcsCategoryEntity
        ])
    ],
    controllers: [categoryController],
    providers: [categoryService, {provide: CATEGORY_REPOSITORY, useClass: CategoryRepository}],
    exports:[]
})
export class categoryModule {}