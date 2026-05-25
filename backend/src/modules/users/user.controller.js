import { createUsers, deleteUsers, getUserbyIdServices, getUserServices } from "./user.service.js";

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
}

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
}

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
}

export const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUsers(id);
        res.status(200).json({
            success: true,
            message: "User delete successfully"
        })
    } catch (error) {
        console.log("Error on deleting user")

        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}