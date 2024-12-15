import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
} from 'typeorm';
import { Employer } from './Employer';

@Entity()
export class Candidate extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    order?: number;

    @Column({ nullable: true })
    name?: string;

    @OneToOne(() => Employer, employer => employer.candidate, { onDelete: 'CASCADE' })
    employer?: Employer;

    @Column({ nullable: true })
    socials?: string;
}