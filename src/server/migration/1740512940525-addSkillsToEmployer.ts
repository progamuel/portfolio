import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSkillsToEmployer1740512940525 implements MigrationInterface {
    name = 'AddSkillsToEmployer1740512940525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" ADD "skills" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "skills"`);
    }

}
