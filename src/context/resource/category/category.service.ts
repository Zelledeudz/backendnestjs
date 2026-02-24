import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import * as categoryRepositoryInterface from "./category.repository.interface";
import { RcsCategoryEntity } from "./entities/category-entity";

@Injectable()
export class categoryService {
  constructor(
    @Inject(categoryRepositoryInterface.CATEGORY_REPOSITORY)
    private readonly categoryRepository: categoryRepositoryInterface.ICategoryRepository
  ) {}

  async createCategory(nameCategory: string): Promise<RcsCategoryEntity> {
    const category = new RcsCategoryEntity();
    category.nameCategory = nameCategory;

    return await this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<RcsCategoryEntity[]> {
    return await this.categoryRepository.findAll();
  }

  async getCategoryById(id: string): Promise<RcsCategoryEntity> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async updateCategoryById(
    id: string,
    nameCategory?: string
  ): Promise<RcsCategoryEntity> {
    const category = await this.getCategoryById(id);

    if (nameCategory !== undefined) {
      category.nameCategory = nameCategory;
    }

    return await this.categoryRepository.save(category);
  }

  async deleteCategoryById(id: string): Promise<void> {
    const category = await this.getCategoryById(id);
    await this.categoryRepository.delete(category.id);
  }
}