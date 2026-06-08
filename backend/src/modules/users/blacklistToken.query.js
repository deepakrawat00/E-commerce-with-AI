import connectDB from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";

export const isTokenBlacklisted = async (token) => {
    const [row] = await connectDB.execute(
        `SELECT token from blacklist_token WHERE token=?`,
        [token]
    )
    return row[0] || null;
}

export const blackListToken = async (token) => {
    try {
        const [result] = await connectDB.execute(
            `INSERT INTO blacklist_token (token) VALUES (?)`,
            [token]
        );
        return result;
    } catch (error) {
        console.log("Error -> ", error)
        if (error.code === 'ER_AUTOINC_READ_FAILED') {
            throw new AppError('Database error: Auto-increment failed. Contact support.', 500);
        }
        throw error;
    }
}