import connectDB from "../../../config/db.js";

export const checkEmail = async (email) => {
    const [row] = await connectDB.execute(
        `SELECT email FROM users WHERE email=?`,
        [email]
    );
    return row[0] || null;
}

export const registerQuery = async (name, email, password) => {
    const [result] = await connectDB.execute(
        `INSERT INTO users (name,email,password) VALUES (?,?,?)`,
        [name, email, password,]
    )
    const [row] = await connectDB.execute(
        `SELECT id, name, email, role, is_verified FROM users WHERE id=?`,
        [result.insertId]
    )
    const user = row[0];
    return {
        ...user,
        is_verified: user.is_verified === 1,
        is_suspend: user.is_suspend === 1,
    };
}

export const loginQuery = async (email) => {
    const [row] = await connectDB.execute(
        `SELECT id, email, password, role FROM users WHERE email=?`,
        [email]
    );
    return row[0] || null;
}

export const logoutQuery = async (token) => {
    const [row] = await connectDB.execute(
        `SELECT token FROM blacklist_token WHERE token=?`,
        [token]
    );
    return row[0] || null;
}

export const profileQuery = async (id) => {
    const [row] = await connectDB.execute(
        `SELECT id, name, email, phone_no, image_id, is_suspend, is_verified FROM users WHERE id=?`,
        [id]
    );

    const user = row[0];
    return {
        ...user,
        is_suspend: user.is_suspend === 1,
        is_verified: user.is_verified === 1
    };
}