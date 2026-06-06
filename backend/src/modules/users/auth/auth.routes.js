import { Router } from "express";
import { login, logout, register } from "./auth.controller.js";
import { protectedRoute } from "../../../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', protectedRoute, logout);

export default authRouter;