import { FilmEntity } from "src/context/resource/film/entities/film-entity";
import { DEFAULT_ADMIN_PERMISSIONS, DEFAULT_PERMISSIONS } from "src/core/permissions/permission";
import { Column, CreateDateColumn, Entity, Index, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";

@Entity('user_credentials')
export class UserCredentialsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'password_hash', type: "varchar", length: 255 })
    passwordHash: string;

    @Index({ unique: true })
    @Column({ name: 'email', type: "varchar", length: 255 })
    email: string;

    @ManyToMany(() => FilmEntity, film => film.favoritedBy)
    @JoinTable({
        name: 'user_favorite_films',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'film_id', referencedColumnName: 'id' }
    })
    favoriteFilms: FilmEntity[];

    @Column({
        name: 'permission',
        type: 'bigint',
        unsigned: true,
        default: DEFAULT_PERMISSIONS.toString(),
        transformer: {
            to: (value: bigint | undefined) => (value ?? DEFAULT_PERMISSIONS).toString(),
            from: (value: string) => BigInt(value ?? DEFAULT_PERMISSIONS),
        },
    })
    permissions: bigint;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}