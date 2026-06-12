import connectDB from "../../../config/db.js";

export const existingEmail = async (email) => {
    const [row] = await connectDB.execute(
        `SELECT email FROM users WHERE email = ?`,
        [email]
    );
    return row[0] || null;
}

export const createUser = async (name, email, password) => {
    const [rows] = await connectDB.execute(
        `INSERT INTO users (name,email,password) VALUES (?,?,?)`,
        [name, email, password]
    )
    const [result] = await connectDB.execute(
        `SELECT name,email,is_verified FROM users WHERE id = ?`,
        [rows.insertId]
    )
    const user = result[0]
    return {
        ...user,
        is_verified: user.is_verified === 1
    };
}

export const checkId = async (id) => {
    const [result] = await connectDB.execute(
        `SELECT id, role FROM users WHERE id=?`,
        [id]
    );
    return result[0]
}

export const deleteUserQuery = async (id) => {
    const [result] = await connectDB.execute(
        `DELETE FROM users WHERE id=?`,
        [id]
    )

    return result.affectedRows > 0;
}

export const getAllUsersQuery = async () => {
    const [result] = await connectDB.execute(
        `SELECT id, name, email, role, is_suspend, auth_provider, is_verified FROM users`
    );

    return result.map(user => ({
        ...user,
        is_suspend: user.is_suspend === 1,
        is_verified: user.is_verified === 1
    }))
}

export const getuserbyIdQuery = async (id) => {
    const [result] = await connectDB.execute(
        `SELECT id, name, email, role, is_suspend, auth_provider, is_verified FROM users WHERE id=?`,
        [id]
    )
    const user = result[0];

    return {
        ...user,
        is_suspend: user.is_suspend === 1,
        is_verified: user.is_verified === 1
    }
}

export const updateByAdminQuery = async (id, role, is_suspend) => {
    const fields = [];
    const values = [];
    const suspend_value = is_suspend === true ? 1 : 0;
    if (role !== undefined) {
        fields.push('role=?');
        values.push(role)
    }
    if (is_suspend !== undefined) {
        fields.push('is_suspend=?');
        values.push(is_suspend);
    }
    if (fields.length === 0) {
        return false;
    }

    values.push(id);

    const [result] = await connectDB.execute(
        `UPDATE users SET ${fields.join(', ')} WHERE id=?`,
        values
    );

    return result.affectedRows > 0;
}