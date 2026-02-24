import { IsNumber, IsString } from "class-validator"

// Information d'entrée
export class RcsCategoryDTO {
    nameCategory: string;
  }
  
  export class UpdateCategoryDTO {
    nameCategory?: string;
  }