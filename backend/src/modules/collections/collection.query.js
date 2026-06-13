import connectDB from "../../config/db.js";

export const checkSlugQuery = async (slug) => {
    const [rows] = await connectDB.execute(
        `SELECT slug FROM collections WHERE slug=?`,
        [slug]
    )
    return rows[0];
}

export const checkIDQuery = async (id) => {
    const [rows] = await connectDB.execute(
        `SELECT id, slug FROM collections WHERE id=?`,
        [id]
    )
    return rows[0];
}
export const createCollectionQuery = async (title, description, image_id, meta_title, meta_description, slug, status) => {
    const [result] = await connectDB.execute(
        `INSERT INTO collections (title, description, image_id, meta_title, meta_description, slug, status) VALUES (?,?,?,?,?,?,?)`,
        [title, description, image_id, meta_title, meta_description, slug, status]
    )
    return result.affectedRows > 0;
}

export const getCollectionQuery = async () => {
    const [rows] = await connectDB.execute(
        `SELECT id, title, description, image_id, meta_title, meta_description, slug, status FROM collections`
    )
    return rows.map(collection => ({
        ...collection,
        status: collection.status === 1
    }))
}

export const getColletionByIdQuery = async (id) => {
    const [rows] = await connectDB.execute(
        `SELECT id, title, description, image_id, meta_title, meta_description, slug, status FROM collections WHERE id=?`,
        [id]
    )
    const collection = rows[0];
    console.log(collection)
    return {
        ...collection,
        status: collection.status === 1
    }
}

export const deleteCollectionQuery = async (id) => {
    const [result] = await connectDB.execute(
        `DELETE FROM collections WHERE id=?`,
        [id]
    )
    return result.affectedRows > 0
}

export const updateCollectionQuery = async (id, title, description, image_id, meta_title, meta_description, slug, status) => {
    const fields = [];
    const values = [];
    if (title !== undefined) {
        fields.push('title=?');
        values.push(title)
    }
    if (description !== undefined) {
        fields.push('description=?');
        values.push(description)
    }
    if (image_id !== undefined) {
        fields.push('image_id=?');
        values.push(image_id)
    }
    if (meta_title !== undefined) {
        fields.push('meta_title=?');
        values.push(meta_title)
    }
    if (meta_description !== undefined) {
        fields.push('meta_description=?');
        values.push(meta_description)
    }
    if (slug !== undefined) {
        fields.push('slug=?');
        values.push(slug)
    }
    if (status !== undefined) {
        fields.push('status=?');
        values.push(status)
    }
    values.push(id);
    console.log("Fields -> ", fields);
    console.log("VALUES -> ", values);

    const [result] = await connectDB.execute(
        `UPDATE collections SET ${fields.join(', ')} WHERE id=?`,
        values
    )
    console.log("RESULT -> ", result)
    return result.affectedRows > 0;
}