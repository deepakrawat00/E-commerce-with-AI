import { createCollectionService, deleteCollectionService, getCollectionByIdService, getCollectionService, updateCollectionService } from "./collection.service.js";

export const createCollection = async (req, res, next) => {
    try {
        const collection = req.body;

        const result = await createCollectionService(collection);

        res.status(201).json({
            success: true,
            message: "Collection create successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const getCollections = async (req, res, next) => {
    try {
        const result = await getCollectionService();
        res.status(200).json({
            success: true,
            message: "Collections fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const getCollectionByID = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await getCollectionByIdService(id);

        res.status(200).json({
            success: true,
            message: "Collection fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const deleteCollection = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await deleteCollectionService(id);

        res.status(200).json({
            success: true,
            message: "Collection delete successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const updateCollection = async (req, res, next) => {
    try {
        const id = req.params.id;
        const collection = req.body;

        const result = await updateCollectionService(id, collection);

        res.status(200).json({
            success: true,
            message: "Collection update successfully"
        })
    } catch (error) {
        next(error)
    }
}