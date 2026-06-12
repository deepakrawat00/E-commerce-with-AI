import { Router } from "express";
import { addImage, deleteImages, getAllImage, getImageByID, replaceImage } from "./image.controller.js";
import { upload } from "../../middleware/upload.js";
import { protectedRoute } from "../../middleware/auth.middleware.js"

const imageRoutues = Router();

imageRoutues.get('/', protectedRoute, getAllImage);
imageRoutues.get('/:id', protectedRoute, getImageByID);
imageRoutues.post('/add', protectedRoute, upload.array('files', 10), addImage);
imageRoutues.delete('/:id', protectedRoute, deleteImages);
imageRoutues.patch('/:id', protectedRoute, upload.single('file'), replaceImage);

export default imageRoutues;