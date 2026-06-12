import { loginService, logoutService, profileService, registerService, updateProfileService } from "./auth.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { user, token } = await registerService(name, email.toLowerCase(), password);

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
        next(error);
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
        next(error);
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
        next(error);
    }
}

export const profile = async (req, res, next) => {
    try {
        const { id } = req.user;
        const result = await profileService(id);
        res.status(200).json({
            seccess: true,
            message: "Profile fetch successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = req.body;

        const result = await updateProfileService(id, user);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        })
    } catch (error) {
        next(error)
    }
}