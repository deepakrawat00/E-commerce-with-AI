import { Router } from "express";
import { protectedRoute } from "../../middleware/auth.middleware.js";
import { addAddress, deleteAddress, getAddressByID, getAllAddress, updateAddress } from "./address.controller.js";

const addressRoutes = Router();

addressRoutes.post("/add", protectedRoute, addAddress);
addressRoutes.get("/", protectedRoute, getAllAddress);
addressRoutes.get("/:id", protectedRoute, getAddressByID);
addressRoutes.put("/:id", protectedRoute, updateAddress);
addressRoutes.delete("/:id", protectedRoute, deleteAddress);

export default addressRoutes;