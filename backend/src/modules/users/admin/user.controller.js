import { createUsers, deleteUsers, getUserbyIdServices, getUserServices, updateUserServices } from "./user.service.js";

export const getUsers = async (req, res) => {
    try {
        const result = await getUserServices();
        res.status(200).json({
            success: true,
            message: "User fetched successfuly",
            data: result
        })
    } catch (error) {
        console.log("Error on fetch user :- ", error);

        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
};

export const getUsersById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await getUserbyIdServices(id);
        res.status(200).json({
            success: true,
            message: "User fetched successfuly",
            data: result
        })
    } catch (error) {
        console.log("Error on fetch user :- ", error);

        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
};

export const addUsers = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const result = await createUsers(name, email, password);

        res.status(201).json({
            success: true,
            message: "User create successfully",
            data: result
        })
    } catch (error) {
        console.log("Error on add user :- ", error);

        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'Internal server error'
        })
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUsers(id);
        res.status(200).json({
            success: true,
            message: "User delete successfully"
        })
    } catch (error) {
        console.log("Error on deleting user", error)

        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        res.status(200).json({
            success: true,
            message: "Login successfully"
        })
    } catch (error) {
        console.log("Error on login ", error)

        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
};

export const updateUserById = async (req, res) => {
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
        console.log("Error on updating user :-", error);

        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
};
