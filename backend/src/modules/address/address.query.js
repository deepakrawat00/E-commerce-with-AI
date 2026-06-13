import connectDB from "../../config/db.js";

export const addAddressQuery = async (user_id, address) => {
    await connectDB.execute(
        `UPDATE addresses SET is_default=0 WHERE user_id=?`, [user_id]
    )
    const [result] = await connectDB.execute(
        `INSERT INTO addresses (user_id, line1, line2, landmark, city, state, pincode, is_default) VALUES (?,?,?,?,?,?,?,?)`,
        [user_id, address.line1, address.line2, address.landmark, address.city, address.state, address.pincode, 1]
    );
    const [row] = await connectDB.execute(
        "SELECT id, line1, line2, landmark, city, state, pincode, is_default FROM addresses WHERE id=?",
        [result.insertId]
    )
    const addedAddress = row[0];
    return {
        ...addedAddress,
        is_default: addedAddress.is_default === 1
    }
}

export const getAllAddressQuery = async (user_id) => {
    const [rows] = await connectDB.execute(
        `SELECT id, line1, line2, landmark, city, state, pincode, is_default FROM addresses WHERE user_id=?`,
        [user_id]
    );
    return rows.map(add => ({
        ...add,
        is_default: add.is_default === 1
    }))
}

export const checkAddressQuery = async (id, user_id) => {
    const [row] = await connectDB.execute(
        `SELECT id FROM addresses WHERE id=? AND user_id=?`,
        [id, user_id]
    )
    return row[0];
}

export const getAddressByIDQuery = async (id, user_id) => {
    const [rows] = await connectDB.execute(
        `SELECT  id, line1, line2, landmark, city, state, pincode, is_default FROM addresses WHERE id=? AND user_id=?`,
        [id, user_id]
    );
    const address = rows[0];
    return {
        ...address,
        is_default: address.is_default === 1
    }
}

export const updateAddressQuery = async (id, user_id, address) => {
    if (address.is_default !== undefined) {
        console.log("chal rha hai")
        await connectDB.execute(
            `UPDATE addresses SET is_default=0 WHERE user_id=?`, [user_id]
        );
    }

    const allowedFields = [
        "line1",
        "line2",
        "landmark",
        "city",
        "state",
        "pincode",
        "is_default"
    ]

    const fields = [];
    const values = [];

    for (const field of allowedFields) {
        if (address[field] !== undefined) {
            fields.push(`${field}=?`);
            values.push(address[field]);
        }
    }
    values.push(id);
    values.push(user_id);

    const [result] = await connectDB.execute(
        `UPDATE addresses SET ${fields.join(', ')} WHERE id=? AND user_id=?`,
        values
    )
    return result.affectedRows > 0;
}

export const deleteAddressQuery = async (id, user_id) => {
    const [result] = await connectDB.execute(
        `DELETE FROM addresses WHERE id=? AND user_id=?`,
        [id, user_id]
    );
    return result.affectedRows > 0;
}