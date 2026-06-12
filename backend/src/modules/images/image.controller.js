import { deleteImageService, getImagesByIdService, getImageService, replaceImageService, uploadImageService } from './image.service.js';

export const getAllImage = async (req, res) => {
    try {
        const result = await getImageService();
        res.status(200).json({
            success: true,
            message: 'Images fetched successfully',
            data: result
        })
    } catch (error) {
        next(error);
    }
}

export const getImageByID = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID ", id)
        const result = await getImagesByIdService(id);

        res.status(200).json({
            success: true,
            message: 'Fetch Image BY ID',
            data: result
        })
    } catch (error) {
        next(error);
    }
}

export const addImage = async (req, res) => {
    try {
        const files = req.files;
        const result = await uploadImageService(files);
        res.status(201).json({
            success: true,
            message: "Images uploaded successfully.",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

export const deleteImages = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteImageService(id);

        res.status(200).json({
            success: true,
            message: "Image delete successfully.",
        })
    } catch (error) {
        next(error);
    }
}

export const replaceImage = async (req, res) => {
    try {
        const id = req.params.id;
        const file = req.file;
        const result = await replaceImageService(id, file);

        res.status(200).json({
            success: true,
            message: "Image replace successfully.",
            data: result
        })
    } catch (error) {
        next(error);
    }
}