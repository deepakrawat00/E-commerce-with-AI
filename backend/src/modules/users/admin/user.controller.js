import { createUsers, deleteUsers, getUserbyIdServices, getUserServices, updateUserServices } from "./user.service.js";

export const getUsers = async (req, res, next) => {
    try {
        const result = await getUserServices();
        res.status(200).json({
            success: true,
            message: "User fetched successfuly",
            data: result
        })
    } catch (error) {
        next(error);
    }
};

export const getUsersById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await getUserbyIdServices(id);
        res.status(200).json({
            success: true,
            message: "User fetched successfuly",
            data: result
        })
    } catch (error) {
        next(error);
    }
};

export const addUsers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const result = await createUsers(name, email, password);

        res.status(201).json({
            success: true,
            message: "User create successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
};

export const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await deleteUsers(id);
        res.status(200).json({
            success: true,
            message: "User delete successfully"
        })
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        res.status(200).json({
            success: true,
            message: "Login successfully"
        })
    } catch (error) {
        next(error);
    }
};

export const updateUserById = async (req, res, next) => {
    const id = req.params.id;
    const { role, is_suspend } = req.body;
    // const suspendValue = is_suspend === true ? 1 : 0;
    const result = await updateUserServices(id, role, is_suspend);
    try {
        res.status(200).json({
            success: true,
            message: "User update successfully"
        })
    } catch (error) {
        next(error);
    }
};
