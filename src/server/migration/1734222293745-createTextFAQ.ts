import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTextFAQ1734222293745 implements MigrationInterface {
    name = 'CreateTextFAQ1734222293745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "text_faq" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" integer, "question" character varying, "answer" character varying, "employerId" uuid, CONSTRAINT "PK_3fe2cbd33cf8d51a0b13312df22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "text_faq" ADD CONSTRAINT "FK_1e6c2beeccbaaea9bf19e970fc6" FOREIGN KEY ("employerId") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "text_faq" DROP CONSTRAINT "FK_1e6c2beeccbaaea9bf19e970fc6"`);
        await queryRunner.query(`DROP TABLE "text_faq"`);
    }

}
