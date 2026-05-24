import connectDB from "../../config/db.js";

export const createImage = async (name, public_id, url) => {
    const [result] = await connectDB.execute(
        `INSERT INTO images (name, public_id, url) VALUES (?,?,?)`,
        [name, public_id, url]
    );
    const [rows] = await connectDB.execute(
        `SELECT * FROM images WHERE id = ?`,
        [result.insertId]
    )
    return rows[0];
}

export const getImages = async () => {
    const [rows] = await connectDB.execute(
        `SELECT * FROM images`,
    )
    return rows;
}

export const getImageUsingID = async (id) => {
    const [rows] = await connectDB.execute(
        `SELECT * FROM images WHERE id = ?`,
        [id]
    );
    return rows[0];
}

export const deleteImage = async (id) => {
    const [result] = await connectDB.execute(
        `DELETE FROM images WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0;
}

export const replaceImages = async (id, name, public_id, url) => {
    const updated_at = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).replace('T', ' ');

    const [result] = await connectDB.execute(
        `UPDATE images SET name=?, public_id=?, url=?, updated_at=? WHERE id = ?`,
        [name, public_id, url, updated_at, id]
    )

    const [row] = await connectDB.execute(
        `SELECT * FROM images WHERE id=?`,
        [id]
    )

    return row[0];
}