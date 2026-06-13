import { addAddressService, deleteAddressService, getAddressByIDService, getAllAddressService, updateAddressService } from "./address.service.js";

export const addAddress = async (req, res, next) => {
    try {
        const address = req.body;
        const user_id = req.user.id;

        const result = await addAddressService(user_id, address);
        res.status(201).json({
            success: true,
            message: "Address added successfuly",
            data: result
        })
    } catch (error) {
        next(error);
    }
}

export const getAllAddress = async (req, res, next) => {
    try {
        const user_id = req.user.id;

        const result = await getAllAddressService(user_id);
        res.status(200).json({
            success: true,
            message: "Addresses fetch successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const getAddressByID = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const id = req.params.id;

        const result = await getAddressByIDService(id, user_id);
        res.status(200).json({
            success: true,
            message: "Address fetch successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const updateAddress = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const id = req.params.id;
        const address = req.body

        const result = await updateAddressService(id, user_id, address);
        res.status(200).json({
            success: true,
            message: "Address update successfully",
        })
    } catch (error) {
        next(error)
    }
}

export const deleteAddress = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const id = req.params.id;

        const result = await deleteAddressService(id, user_id);
        res.status(200).json({
            success: true,
            message: "Address delete successfully",
        })
    } catch (error) {
        next(error)
    }
}