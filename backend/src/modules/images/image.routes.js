import { Router } from "express";
import { addImage, deleteImages, getAllImage, getImageByID, replaceImage } from "./image.controller.js";
import { upload } from "../../middleware/upload.js";

const imageRoutues = Router();

imageRoutues.get('/', getAllImage);
imageRoutues.get('/:id', getImageByID);
imageRoutues.post('/add', upload.array('files', 10), addImage);
imageRoutues.delete('/:id', deleteImages);
imageRoutues.patch('/:id', upload.single('file'), replaceImage);

export default imageRoutues;