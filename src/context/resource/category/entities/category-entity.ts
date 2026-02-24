import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("category")
export class RcsCategoryEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ name: "nameCategory", type: "varchar", length: 255 })
  nameCategory!: string;

  @CreateDateColumn()
  createdAt!: Date;

  constructor(nameCategory?: string) {
    if (nameCategory) {
      this.nameCategory = nameCategory;
    }
  }
}