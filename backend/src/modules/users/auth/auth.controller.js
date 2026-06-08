import { loginService, logoutService, registerService } from "./auth.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { user, token } = await registerService(name, email, password);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "User register successfully",
            data: user,
            token
        })
    } catch (error) {
        console.log("Error on register ->", error);

        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await loginService(email.toLowerCase(), password);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            success: true,
            message: "Login successfully",

            token
        })
    } catch (error) {
        console.log("Error on login -> ", error);

        const statusCode = error.statusCode || 500;

        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

export const logout = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        const result = await logoutService(token);
        res.clearCookie("Token", {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });
        res.status(200).json({
            success: true,
            message: "Logout successfully"
        })
    } catch (error) {
        console.log("Error on logout :- ", error);

        const statusCode = error.statusCode || 500;

        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}