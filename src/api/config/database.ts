import {Options} from "sequelize";

require('dotenv').config();

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE,
} = process.env;

const config: Options = {
    dialect: 'mysql',
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    define: {
        timestamps: true,
        freezeTableName: true,
        underscored: false,
    },
    dialectOptions: {
        timezone: '-03:00',
    },
    timezone: '-03:00',
}

export default config;
