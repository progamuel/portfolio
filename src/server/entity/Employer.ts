import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    subdomain?: string;

    @Column({ nullable: true })
    name?: string;

    @Column('json', { nullable: true })
    style?: string;

    @Column({ nullable: true })
    textTitle?: string;

    @Column({ nullable: true })
    textIntro?: string;

    @Column('json', { nullable: true })
    botOptions?: string;

    @Column('json', { nullable: true })
    candidate?: string;

    @Column('json', { nullable: true })
    thesisTexts?: string;

    @Column('json', { nullable: true })
    faqTexts?: string;
}