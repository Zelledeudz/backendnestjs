import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RcsCategoryEntity } from "../../category/entities/category-entity";
import { UserCredentialsEntity } from "src/context/auth/entities/user-credentials-entity";

@Entity("film")
export class FilmEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index({ unique: true })
    @Column({ name: "title", type: "varchar", length: 255 })
    title: string;

    @Column({ name: "description", type: "varchar", length: 255 })
    description: string;

    @Column({ name: "release", type: "date" })
    release: Date;

    @ManyToMany(() => RcsCategoryEntity, { nullable: false })
    @JoinTable()
    categories: RcsCategoryEntity[];

    @ManyToMany(() => UserCredentialsEntity, user => user.favoriteFilms)
    favoritedBy: UserCredentialsEntity[];
}