import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_credentials')
export class UserCredentialsEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column( {name: 'password_hash', type: "varchar", length: 255})
    passwordHash: string;

    @Index({unique: true})
    @Column({name: 'email', type: "varchar", length: 255})
    email: string;

    @CreateDateColumn({name: 'created_At'})
    createdAt: Date
}

