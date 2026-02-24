import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { categoryService } from "./category.service";
import { RcsCategoryDTO } from "./types/category.dto";
import { UpdateCategoryDTO } from "./types/category.dto";
import { CATEGORY_REPOSITORY } from "./category.repository.interface";
import { PermissionsGuard } from "src/core/permissions/permission.guard";
import { RequirePermission } from "src/core/permissions/require.permission";
import { Permission } from "src/core/permissions/permission";

@Controller("category")
@UseGuards(PermissionsGuard)
export class categoryController {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryService: categoryService
  ) {}

  @Post("add")
  @RequirePermission(Permission.USER_READ)
  async createCategory(@Body() createCategoryDto: RcsCategoryDTO) {
    return await this.categoryService.createCategory(
      createCategoryDto.nameCategory
    );
  }

  @Get("all")
  @RequirePermission(Permission.USER_READ)
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Get(":id")
  @RequirePermission(Permission.USER_READ)
  async getCategoryById(@Param("id") id: string) {
    return await this.categoryService.getCategoryById(id);
  }

  @Patch("update/:id")
  @RequirePermission(Permission.USER_READ)
  async updateCategory(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDTO
  ) {
    return await this.categoryService.updateCategoryById(
      id,
      updateCategoryDto.nameCategory
    );
  }

  @Delete("delete/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequirePermission(Permission.USER_READ)
  async deleteCategory(@Param("id") id: string) {
    return await this.categoryService.deleteCategoryById(id);
  }
}