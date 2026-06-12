import fs from 'fs';
import { replaceOnCloud, uploadOnCloud } from "../../utils/cloudinary.js";
import { createImage, deleteImage, getImages, getImageUsingID, replaceImages } from "./image.query.js";
import { AppError } from '../../utils/AppError.js';

export const uploadImageService = async (files, user_id) => {
    if (!files || files.length == 0) throw new AppError('File not provided', 400);
    const uploadImages = files.map(async (file) => {
        const { originalname, path } = file;
        try {
            const cloud_response = await uploadOnCloud(path);

            if (!cloud_response) throw new AppError('Failed to upload on cloud', 502);
            const data = {
                user_id: user_id,
                name: originalname,
                public_id: cloud_response.public_id,
                secure_url: cloud_response.secure_url
            }

            return await createImage(data);
        } catch (error) {
            console.log("Error uploading file" + originalname, error);

            if (fs.existsSync(path)) fs.unlinkSync(path)
            return null;
        }
    })
    const results = await Promise.all(uploadImages);
    const successfullUploads = results.filter(item => item != null);
    if (successfullUploads.length === 0) throw new AppError('All uploads failds', 502);
    return successfullUploads;
}

export const getImageService = async (user_id) => {
    const images = await getImages(user_id);
    if (images.length === 0) throw new AppError('No images found', 404);
    return images;
}

export const getImagesByIdService = async (id, user_id) => {
    if (!id || isNaN(id)) throw new AppError('Invalid image ID', 400);
    const images = await getImageUsingID(id, user_id);
    if (!images) throw new AppError('Images not found', 404);
    return images;
}

export const deleteImageService = async (id, user_id) => {
    if (!id || isNaN(id)) throw new AppError('Invalid image ID', 400);
    const images = await getImageUsingID(id, user_id);
    if (!images) throw new AppError('Images not found', 404);
    const deleted = await deleteImage(id, user_id);
    if (!deleted) throw new AppError('Failed to delete image', 500);
}

export const replaceImageService = async (id, file, user_id) => {
    if (!file) throw new AppError('File not provided', 400);

    const { originalname, path } = file;

    if (!id || isNaN(id)) throw new AppError('Invalid image ID', 400);
    const findImage = await getImageUsingID(id, user_id);
    if (!findImage) throw new AppError('Images not found', 404);

    const cloud_response = await replaceOnCloud(path, findImage.public_id);

    if (!cloud_response) throw new AppError('Failed to upload on cloud', 502);

    const updatedImages = await replaceImages(findImage.id, originalname, cloud_response.public_id, cloud_response.secure_url, user_id)
    if (!updatedImages) throw new AppError('Failed to update image', 500)
    return updatedImages;
}