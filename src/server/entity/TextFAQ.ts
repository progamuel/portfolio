import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { Employer } from './Employer';

@Entity()
export class TextFAQ extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    order?: number;

    @ManyToOne(() => Employer, employer => employer.faqTexts, { onDelete: 'CASCADE' })
    employer?: Employer;

    @Column({ nullable: true })
    question?: string;

    @Column({ nullable: true })
    answer?: string;
}