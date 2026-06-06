import bcrypt from "bcryptjs";
import { AppError } from "../../../utils/AppError.js";
import { checkEmail, loginQuery, registerQuery } from "./auth.query.js";
import config from "../../../config/env.config.js";
import { generateToken } from "../../../middleware/jwt.js";
import { blackListToken, checkToken } from "../blacklistToken.query.js";

export const registerService = async (name, email, password) => {
    const existingEmail = await checkEmail(email);
    if (existingEmail) throw new AppError('User already created', 409);

    const salt = bcrypt.genSaltSync(Number(config.SALT));
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const user = await registerQuery(name, email, hashedPassword);
    if (!user) throw new AppError('Faild to register user and try again sometime');
    const token = generateToken(user);
    return { user, token };
}

export const loginService = async (email, password) => {
    const user = await loginQuery(email);
    if (!user || user === null) throw new AppError("Invalid email or password", 401)
    const checkPassword = await bcrypt.compareSync(password, user.password);
    if (!checkPassword) throw new AppError("Invalid email or password", 401);
    const token = generateToken(user);
    return token
}

export const logoutService = async (token) => {
    if (!token) throw new AppError("Unauthorized access", 401);
    const check_token = await checkToken(token);
    if (check_token) throw new AppError("Unauthorized access", 401);
    const add_token = await blackListToken(token);
    if (!add_token) throw new AppError("Unauthorized access", 401);
    return true;
}