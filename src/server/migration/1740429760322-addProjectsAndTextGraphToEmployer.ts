import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectsAndTextGraphToEmployer1740429760322 implements MigrationInterface {
    name = 'AddProjectsAndTextGraphToEmployer1740429760322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" ADD "textGraph" character varying`);
        await queryRunner.query(`ALTER TABLE "employer" ADD "projects" json`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "createdAt" SET DEFAULT '2025-02-24T20:42:41.237Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "createdAt" SET DEFAULT '2025-02-23 22:16:55.87'`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "projects"`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "textGraph"`);
    }

}
