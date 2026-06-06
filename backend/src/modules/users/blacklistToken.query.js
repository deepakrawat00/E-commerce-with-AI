import connectDB from "../../config/db.js";

export const checkToken = async (token) => {
    const [row] = await connectDB.execute(
        `SELECT token from blacklist_token WHERE token=?`,
        [token]
    )
    return row[0] || null;
}

export const blackListToken = async (token) => {
    const [result] = await connectDB.execute(
        `INSERT INTO blacklist_token (token) VALUES (?)`,
        [token]
    )
    return result;
}