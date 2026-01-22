import { Injectable } from "@nestjs/common"
import { ICategoryRepository } from "./category.repository.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { RcsCategoryEntity } from "./entities/category-entity"
import { Repository } from "typeorm"

@Injectable()

export class categoryRepository implements ICategoryRepository {
    constructor(
       @InjectRepository(RcsCategoryEntity) private readonly categeoryRepository: Repository<RcsCategoryEntity>
    ){}
    
    async findCategoryByName(nameCategory: string): Promise<RcsCategoryEntity | null> {
        const entity = await this.categeoryRepository.findOne({
            where:{ nameCategory }
        })
        return entity
    }

    async addCategory(nameCategory: string): Promise<RcsCategoryEntity> {
        const category = this.categeoryRepository.create({nameCategory})
        return await this.categeoryRepository.save(category);
    }
}