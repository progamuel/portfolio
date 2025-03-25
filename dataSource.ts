import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URI } = process.env;

if (!DB_URI) {
    throw new Error("Missing DB_URI environment variable");
}

const mongoOptions: DataSourceOptions = {
    type: 'mongodb',
    url: DB_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [`${__dirname}/server/entity/*{.js,.ts}`],
    migrations: [`${__dirname}/server/migration/*{.js,.ts}`],
};

export const dataSource = new DataSource(mongoOptions);
