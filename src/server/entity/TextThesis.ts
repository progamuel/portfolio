import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { Employer } from './Employer';

@Entity()
export class TextThesis extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    order?: number;

    @ManyToOne(() => Employer, employer => employer.thesisTexts, { onDelete: 'CASCADE' })
    employer?: Employer;

    @Column({ nullable: true })
    title?: string;

    @Column({ nullable: true })
    texts?: string;
}