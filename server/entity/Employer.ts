import {
    Entity,
    Column,
    BaseEntity,
    ObjectId,
    ObjectIdColumn,
} from 'typeorm';

@Entity('employers')
export class Employer extends BaseEntity {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column('timestamp')
    createdAt?: Date;

    @Column({ nullable: true })
    subdomain?: string;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    style?: object;

    @Column({ nullable: true })
    textTitle?: string;

    @Column({ nullable: true })
    textIntro?: string;

    @Column({ nullable: true })
    textGraph?: string;

    @Column({ nullable: true })
    textProjects?: string;

    @Column({ nullable: true })
    projectMinWidth?: string;

    @Column({ nullable: true })
    botOptions?: object;

    @Column({ nullable: true })
    candidate?: object;

    @Column({ nullable: true })
    skills?: object;

    @Column({ nullable: true })
    thesisTexts?: object;

    @Column({ nullable: true })
    projects?: object;

    @Column({ nullable: true })
    faqTexts?: object;

}