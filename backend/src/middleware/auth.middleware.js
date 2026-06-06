import jwt from 'jsonwebtoken';
import config from '../config/env.config.js';
import { checkId } from '../modules/users/admin/user.query.js';
import { AppError } from '../utils/AppError.js';

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) throw new AppError("Unauthorized access", 401);

        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

        if (!decoded) throw new AppError("Unauthorized access", 401);

        const user = await checkId(decoded.id)
        if (!user) throw new AppError("Unauthorized access", 401);
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectedRoute middleware :- ", error.message);
        next(error);
    }
}