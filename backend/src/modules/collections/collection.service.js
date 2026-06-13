import { finalSlugify, slugify } from "../../helper/slugify.js";
import { AppError } from "../../utils/AppError.js";
import { checkIDQuery, checkSlugQuery, createCollectionQuery, deleteCollectionQuery, getCollectionQuery, getColletionByIdQuery, updateCollectionQuery } from "./collection.query.js";

export const createCollectionService = async (collection) => {
    let slug = slugify(collection.slug);
    const finalSlug = await finalSlugify(slug, checkSlugQuery);

    const meta_title = collection.meta_title ? collection.meta_title : collection.title;

    const meta_description = collection.meta_description ? collection.meta_description : collection.description;

    const createCollection = await createCollectionQuery(collection.title, collection.description, collection.image_id, meta_title, meta_description, finalSlug, collection.status);
    if (!createCollection) throw new AppError("Faild to create collection", 500);
    return createCollection
}

export const getCollectionService = async () => {
    const collection = await getCollectionQuery();
    if (!collection || collection === null || collection == undefined) throw new AppError("Faild to fetch collections", 500);
    return collection;
}

export const getCollectionByIdService = async (id) => {
    const checkID = await checkIDQuery(id);
    if (checkID === null || checkID === undefined || !checkID) throw new AppError('Collection not found', 404);

    const collection = await getColletionByIdQuery(id);
    if (!collection || collection === null || collection == undefined) throw new AppError("Faild to fetch collection", 500);

    return collection;
}

export const deleteCollectionService = async (id) => {
    const checkID = await checkIDQuery(id);
    if (checkID === null || checkID === undefined || !checkID) throw new AppError('Collection not found', 404);

    const delete_collection = await deleteCollectionQuery(id);
    if (!delete_collection || delete_collection === undefined || delete_collection == null) throw new AppError("Faild to delete collection", 500);
    return delete_collection
}

export const updateCollectionService = async (id, collection) => {
    const checkID = await checkIDQuery(id);
    if (checkID === null || checkID === undefined || !checkID) throw new AppError('Collection not found', 404);
    let finalSlug;
    if (collection.slug !== undefined) {
        if (checkID.slug !== collection.slug) {
            let slug = slugify(collection.slug);
            finalSlug = await finalSlugify(slug, checkSlugQuery);
        }
    }

    const update_collection = await updateCollectionQuery(id, collection.title, collection.description, collection.image_id, collection.meta_title, collection.meta_description, finalSlug, collection.status);
    if (!update_collection || update_collection === undefined || update_collection === null) throw new AppError("Faild to update collection", 500)

    return update_collection;
}