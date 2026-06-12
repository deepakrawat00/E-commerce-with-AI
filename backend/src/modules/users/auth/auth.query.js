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
        `SELECT 
            users.id, 
            users.name, 
            users.email, 
            users.phone_no, 
            users.is_suspend, 
            users.is_verified,

            images.url AS img_url

        FROM users 
        LEFT JOIN images 
        ON users.image_id = images.id 
        WHERE users.id=?`,
        [id]
    );

    const user = row[0];
    return {
        ...user,
        is_suspend: user.is_suspend === 1,
        is_verified: user.is_verified === 1
    };
}

export const updateProfileQuery = async (id, user) => {
    const fields = [];
    const values = [];

    if (user.name !== undefined) {
        fields.push("name=?");
        values.push(user.name);
    }
    if (user.email !== undefined) {
        fields.push("email=?");
        values.push(user.email);
    }
    if (user.phone_no !== undefined) {
        fields.push("phone_no=?");
        values.push(user.phone_no);
    }
    if (user.image_id !== undefined) {
        fields.push("image_id=?");
        values.push(user.image_id);
    }
    if (fields.length === 0) {
        return false;
    }
    values.push(id);
    const [result] = await connectDB.execute(
        `UPDATE users SET ${fields.join(', ')} WHERE id=?`,
        values
    )
    return result.affectedRows > 0;
}