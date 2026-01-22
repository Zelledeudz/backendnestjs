import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common"
import { categoryService } from "./category.service";
import { RcsCategoryEntity } from "./entities/category-entity";
import { CATEGORY_REPOSITORY } from "./category.repository.interface";

@Controller('category')
export class categoryController {
    constructor(
      @Inject(CATEGORY_REPOSITORY) private readonly categoryService: categoryService
    ) {}

    @Post("add")
      async createCategory(@Body() CategoryDto: RcsCategoryEntity) {
          return await this.categoryService.createCategory(CategoryDto.nameCategory);
      }
}