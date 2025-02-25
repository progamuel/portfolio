import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSkillsToEmployer1740512940525 implements MigrationInterface {
    name = 'AddSkillsToEmployer1740512940525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" ADD "skills" json`);
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "createdAt" SET DEFAULT '2025-02-25T19:49:01.519Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" ALTER COLUMN "createdAt" SET DEFAULT '2025-02-24 20:42:41.237'`);
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "skills"`);
    }

}
