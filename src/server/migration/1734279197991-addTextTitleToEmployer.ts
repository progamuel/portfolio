import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTextTitleToEmployer1734279197991 implements MigrationInterface {
    name = 'AddTextTitleToEmployer1734279197991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" ADD "textTitle" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "textTitle"`);
    }

}
