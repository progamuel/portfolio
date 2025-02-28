import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const {
    DB_ID,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    NODE_ENV,
} = process.env;

if (!DB_ID || !DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD) {
    throw Error("Invalid or missing env variables");
}

const entitiesPaths = [`${__dirname}/server/entity/*{.js,.ts}`];
const migrationsPaths = [`${__dirname}/server/migration/*{.js,.ts}`];

const postgresOptions: DataSourceOptions = {
    type: 'postgres',
    database: DB_ID,
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    synchronize: false,
    logging: false,
    dropSchema: false,
    entities: entitiesPaths,
    migrations: migrationsPaths,
    ssl: DB_HOST !== 'localhost' && {
        rejectUnauthorized: false,
    },
};

export const dataSource = new DataSource(postgresOptions);