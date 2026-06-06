import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../../config/env.config.js';
import { AppError } from '../../../utils/AppError.js';
import { checkId, createUser, deleteUserQuery, existingEmail, getAllUsersQuery, getuserbyIdQuery, updateByAdminQuery } from './user.query.js';

export const getUserServices = async () => {
    const users = await getAllUsersQuery();
    if (users.length === 0) throw new AppError('No users found', 404);
    return users;
}

export const getUserbyIdServices = async (id) => {
    const existId = await checkId(id);
    if (!existId) throw new AppError("User not found", 404);

    const user = await getuserbyIdQuery(id);
    if (!user) throw new AppError("Failed to find user", 500);

    return user;
}

export const createUsers = async (name, email, password) => {
    const existEmail = await existingEmail(email);
    if (existEmail) throw new AppError('User already register', 409);

    const salt = bcrypt.genSaltSync(Number(config.SALT));
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = await createUser(name, email, hashedPassword);
    if (!user) throw new AppError('Failed to create user', 500)
    return user;
}

export const deleteUsers = async (id) => {
    const existId = await checkId(id);
    if (!existId) throw new AppError('User not found', 404);

    const delete_user = await deleteUserQuery(id);
    if (!delete_user) throw new AppError('Failed to delete user', 500);

    return null;
}

export const updateUserServices = async (id, role, is_suspend) => {
    const existId = await checkId(id);
    if (!existId) throw new AppError('User not found', 404);

    const updateUser = await updateByAdminQuery(id, role, is_suspend);
    if (!updateUser) throw new AppError('Failed to update user', 500);

    return null;
}
