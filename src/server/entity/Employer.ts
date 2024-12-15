import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { TextThesis } from './TextThesis';
import { TextFAQ } from './TextFAQ';
import { Candidate } from './Candidate';

@Entity()
export class Employer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    subdomain?: string;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    botOptions?: string;

    @Column({ nullable: true })
    textTitle?: string;

    @Column({ nullable: true })
    textIntro?: string;

    @OneToOne(() => Candidate, candidate => candidate.employer, { cascade: true })
    @JoinColumn()
    candidate?: Candidate;

    @OneToMany(() => TextThesis, textThesis => textThesis.employer, { cascade: true })
    thesisTexts?: TextThesis[];

    @OneToMany(() => TextFAQ, textFAQ => textFAQ.employer, { cascade: true })
    faqTexts?: TextFAQ[];
}