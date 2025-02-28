import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTextProjectsAndProjectMinWidthToEmployer1740756792891 implements MigrationInterface {
    name = 'AddTextProjectsAndProjectMinWidthToEmployer1740756792891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" ADD "textProjects" character varying`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "projectMinWidth" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "projectMinWidth"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "textProjects"`);
    }

}
