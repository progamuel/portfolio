import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTextThesis1734222254859 implements MigrationInterface {
    name = 'CreateTextThesis1734222254859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "text_thesis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" integer, "title" character varying, "texts" character varying, "employerId" uuid, CONSTRAINT "PK_ab02e05de542e0584adaace7c63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "text_thesis" ADD CONSTRAINT "FK_6572f83ae26fbd2bffb0a890d1b" FOREIGN KEY ("employerId") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "text_thesis" DROP CONSTRAINT "FK_6572f83ae26fbd2bffb0a890d1b"`);
        await queryRunner.query(`DROP TABLE "text_thesis"`);
    }

}
