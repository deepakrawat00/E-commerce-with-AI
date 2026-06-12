import { deleteImageService, getImagesByIdService, getImageService, replaceImageService, uploadImageService } from './image.service.js';

export const getAllImage = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const result = await getImageService(user_id);
        res.status(200).json({
            success: true,
            message: 'Images fetched successfully',
            data: result
        })
    } catch (error) {
        next(error);
    }
}

export const getImageByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;
        const result = await getImagesByIdService(id, user_id);

        res.status(200).json({
            success: true,
            message: 'Fetch Image BY ID',
            data: result
        })
    } catch (error) {
        next(error);
    }
}

export const addImage = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const files = req.files;
        const result = await uploadImageService(files, user_id);
        res.status(201).json({
            success: true,
            message: "Images uploaded successfully.",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

export const deleteImages = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const result = await deleteImageService(id, user_id);

        res.status(200).json({
            success: true,
            message: "Image delete successfully.",
        })
    } catch (error) {
        next(error);
    }
}

export const replaceImage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const file = req.file;
        const user_id = req.user.id;
        const result = await replaceImageService(id, file, user_id);

        res.status(200).json({
            success: true,
            message: "Image replace successfully.",
            data: result
        })
    } catch (error) {
        next(error);
    }
}