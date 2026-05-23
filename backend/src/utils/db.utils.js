import connectDB from '../config/db.js';

export const findAll = async (table) => {
    const [rows] = await connectDB.execute(`SELECT * FROM ??`, [table]);
    return [rows];
}

