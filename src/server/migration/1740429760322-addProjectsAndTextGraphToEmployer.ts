import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectsAndTextGraphToEmployer1740429760322 implements MigrationInterface {
    name = 'AddProjectsAndTextGraphToEmployer1740429760322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" ADD "textGraph" character varying`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "projects" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "projects"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "textGraph"`);
    }

}
