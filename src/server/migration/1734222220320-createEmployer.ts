import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployer1734222220320 implements MigrationInterface {
    name = 'CreateEmployer1734222220320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subdomain" character varying, "name" character varying, "prePrompt" character varying, "textIntro" character varying, CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employer"`);
    }

}
