import mysql from 'mysql2/promise';
import config from './env.config.js';

const initDB = await mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    port: config.DB_PORT
});

await initDB.execute(`CREATE DATABASE IF NOT EXISTS ${config.DB_NAME}`);

const connectDB = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    port: config.DB_PORT,

    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});


export default connectDB;