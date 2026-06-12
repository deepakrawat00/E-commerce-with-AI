import connectDB from "../../config/db.js";

export const createImage = async (data) => {
    const [result] = await connectDB.execute(
        `INSERT INTO images (user_id, name, public_id, url) VALUES (?,?,?,?)`,
        [data.user_id, data.name, data.public_id, data.secure_url]
    );
    const [rows] = await connectDB.execute(
        `SELECT * FROM images WHERE id = ?`,
        [result.insertId]
    )
    return rows[0];
}

export const getImages = async (user_id) => {
    const [rows] = await connectDB.execute(
        `SELECT * FROM images WHERE user_id=?`,
        [user_id]
    )
    return rows;
}

export const getImageUsingID = async (id, user_id) => {
    const [rows] = await connectDB.execute(
        `SELECT * FROM images WHERE id = ? AND user_id=?`,
        [id, user_id]
    );
    return rows[0];
}

export const deleteImage = async (id, user_id) => {
    const [result] = await connectDB.execute(
        `DELETE FROM images WHERE id = ? AND user_id=?`,
        [id, user_id]
    );
    return result.affectedRows > 0;
}

export const replaceImages = async (id, name, public_id, url, user_id) => {

    const [result] = await connectDB.execute(
        `UPDATE images SET name=?, public_id=?, url=? WHERE id = ? AND user_id=?`,
        [name, public_id, url, id, user_id]
    )

    const [row] = await connectDB.execute(
        `SELECT * FROM images WHERE id=?`,
        [id]
    )

    return row[0];
}