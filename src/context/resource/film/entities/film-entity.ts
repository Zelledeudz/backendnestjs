import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RcsCategoryEntity } from "../../category/entities/category-entity";

@Entity("film")
export class FilmEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index({unique: true})
    @Column( {name: "title", type: "varchar", length: 255})
    title: string;

    
    @Column({name: "description", type: "varchar" , length: 255 }) 
    description: string;

    @Column({name: "release", type: "date"}) 
    release: Date;

    /* @OneToMany(type => RcsCategoryEntity, RcsCategoryEntity => RcsCategoryEntity.nameCategory)
    RcsCategoryEntity: RcsCategoryEntity[]; */
}
