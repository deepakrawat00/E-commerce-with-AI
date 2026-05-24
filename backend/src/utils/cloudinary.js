import { v2 as cloudinary } from 'cloudinary';
import config from '../config/env.config.js';
import fs from 'fs';

cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_KEY,
    api_secret: config.CLOUDINARY_SECRET
})

export const uploadOnCloud = async (localpath) => {
    try {
        if (!localpath) return null;
        const response = await cloudinary.uploader.upload(localpath, {
            resource_type: 'auto',
            folder: 'images',
            transformation: {
                fetch_format: 'webp',
                quality: 'auto'
            }
        })
        fs.unlinkSync(localpath);
        return response;
    } catch (error) {
        console.log('Cloudinary upload error :- ', error);
        if (fs.existsSync(localStorage)) fs.unlinkSync(localpath)
        return error;
    }
}

export const replaceOnCloud = async (newFilepath, existingPublic_id) => {
    try {
        if (!newFilepath && !existingPublic_id) return null;
        const response = await cloudinary.uploader.upload(newFilepath, {
            public_id: existingPublic_id,
            overwrite: true,
            invalidate: true,
            resource_type: 'auto',
            transformation: {
                fetch_format: 'webp',
                quality: 'auto'
            }
        })
        fs.unlinkSync(newFilepath);
        return response;
    } catch (error) {
        console.log("Cloudinary replace error :-", error)
        if (fs.existsSync(newFilepath)) fs.unlinkSync(newFilepath);
        return error;
    }
}