import { RcsCategoryEntity } from "./entities/category-entity"


export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY')

export interface ICategoryRepository{
    findCategoryByName(nameCategory: string): Promise<RcsCategoryEntity | null>
    addCategory(nameCategory: string): Promise<RcsCategoryEntity>
}