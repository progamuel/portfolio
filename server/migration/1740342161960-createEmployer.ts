import { MigrationInterface, QueryRunner } from 'typeorm';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';

export class CreateEmployerCollection1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const mongoRunner = queryRunner as unknown as MongoQueryRunner;
    await mongoRunner.databaseConnection.db().createCollection('employers');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const mongoRunner = queryRunner as unknown as MongoQueryRunner;
    await mongoRunner.databaseConnection.db().dropCollection('employers');
  }
}
