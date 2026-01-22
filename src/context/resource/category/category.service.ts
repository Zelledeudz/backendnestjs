import { Inject, Injectable } from "@nestjs/common";
import { CATEGORY_REPOSITORY,  } from "./category.repository.interface";
import type { ICategoryRepository } from "./category.repository.interface"
import { RcsCategoryEntity } from "./entities/category-entity";


@Injectable()
export class categoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY) private readonly filmRepo: ICategoryRepository
  ){}

  async createCategory(nameCategory: string): Promise<RcsCategoryEntity> {
    return await this.filmRepo.addCategory(nameCategory);
  }
}