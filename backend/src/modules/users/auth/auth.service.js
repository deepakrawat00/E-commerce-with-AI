import bcrypt from "bcryptjs";
import { AppError } from "../../../utils/AppError.js";
import { checkEmail, loginQuery, profileQuery, registerQuery, updateProfileQuery } from "./auth.query.js";
import config from "../../../config/env.config.js";
import { generateToken } from "../../../middleware/jwt.js";
import { blackListToken } from "../blacklistToken.query.js";

export const registerService = async (name, email, password) => {
    const existingEmail = await checkEmail(email);
    if (existingEmail) throw new AppError('User already exist', 409);

    const salt = bcrypt.genSaltSync(Number(config.SALT));
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const user = await registerQuery(name, email, hashedPassword);
    if (!user) throw new AppError('Faild to register user and try again sometime');
    const token = generateToken(user);
    return { user, token };
}

export const loginService = async (email, password) => {
    if (!email || !password) throw new AppError("Email and password are required", 400);
    const user = await loginQuery(email);
    if (!user || user === null) throw new AppError("Invalid email or password", 401)
    const checkPassword = await bcrypt.compareSync(password, user.password);
    if (!checkPassword) throw new AppError("Invalid email or password", 401);
    const token = generateToken(user);
    return token
}

export const logoutService = async (token) => {
    if (!token) throw new AppError("Unauthorized access", 401);
    const add_token = await blackListToken(token);
    if (!add_token) throw new AppError("Unauthorized access", 401);
    return true;
}

export const profileService = async (id) => {
    const user = await profileQuery(id);
    if (!user) throw new AppError("Faild to fetch profile");

    return user;
}

export const updateProfileService = async (id, user) => {
    if (user.email) {
        const existingEmail = await checkEmail(user.email);
        if (!existingEmail) throw new AppError('User already exist', 409)
    }

    const update_user = await updateProfileQuery(id, user);
    if (!update_user) throw new AppError("Faild to update profile")

    return true;
}