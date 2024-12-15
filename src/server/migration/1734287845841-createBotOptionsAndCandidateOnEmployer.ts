import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBotOptionsAndCandidateOnEmployer1734287845841 implements MigrationInterface {
    name = 'CreateBotOptionsAndCandidateOnEmployer1734287845841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "candidate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" integer, "name" character varying, "socials" character varying, CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "prePrompt"`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "botOptions" character varying`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "candidateId" uuid`);
        await queryRunner.query(`ALTER TABLE "employer" ADD CONSTRAINT "UQ_7546392412fa32ed740badb29fc" UNIQUE ("candidateId")`);
        await queryRunner.query(`ALTER TABLE "employer" ADD CONSTRAINT "FK_7546392412fa32ed740badb29fc" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" DROP CONSTRAINT "FK_7546392412fa32ed740badb29fc"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP CONSTRAINT "UQ_7546392412fa32ed740badb29fc"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "candidateId"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "botOptions"`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "prePrompt" character varying`);
        await queryRunner.query(`DROP TABLE "candidate"`);
    }

}
