import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToUser1740349014858 implements MigrationInterface {
    name = 'AddCreatedAtToUser1740349014858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT '2025-02-23T22:16:55.870Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer" DROP COLUMN "createdAt"`);
    }

}
