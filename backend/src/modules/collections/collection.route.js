import { Router } from "express";
import { protectedRoute } from "../../middleware/auth.middleware.js";
import { createCollection, deleteCollection, getCollectionByID, getCollections, updateCollection } from "./collection.controller.js";

const collectionRouter = Router();

collectionRouter.post('/', protectedRoute, createCollection);
collectionRouter.get('/', protectedRoute, getCollections);
collectionRouter.get('/:id', protectedRoute, getCollectionByID);
collectionRouter.delete('/:id', protectedRoute, deleteCollection);
collectionRouter.put('/:id', protectedRoute, updateCollection);

export default collectionRouter