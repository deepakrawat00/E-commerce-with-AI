import { Router } from "express";
import { login, logout, profile, register, updateProfile } from "./auth.controller.js";
import { protectedRoute } from "../../../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', protectedRoute, logout);
authRouter.get('/profile', protectedRoute, profile);
authRouter.put('/profile/update', protectedRoute, updateProfile);

export default authRouter;