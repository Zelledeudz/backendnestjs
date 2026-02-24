import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { RcsCategoryEntity } from "./entities/category-entity"
import { Repository } from "typeorm"
import { ICategoryRepository } from "./category.repository.interface"

@Injectable()
export class CategoryRepository implements ICategoryRepository {

  constructor(
    @InjectRepository(RcsCategoryEntity)
    private readonly categoryRepository: Repository<RcsCategoryEntity>
  ) {}

  async findCategoryByName(nameCategory: string): Promise<RcsCategoryEntity | null> {
    return await this.categoryRepository.findOne({
      where: { nameCategory }
    });
  }

  async addCategory(nameCategory: string): Promise<RcsCategoryEntity> {
    const category = this.categoryRepository.create({ nameCategory });
    return await this.categoryRepository.save(category);
  }

  async save(category: RcsCategoryEntity): Promise<RcsCategoryEntity> {
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<RcsCategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findById(id: string): Promise<RcsCategoryEntity | null> {
    return await this.categoryRepository.findOne({
      where: { id }
    });
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}