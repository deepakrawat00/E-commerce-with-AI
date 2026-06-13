import { AppError } from "../../utils/AppError.js";
import { validateLocation } from "../../utils/validate-state.js";
import { addAddressQuery, checkAddressQuery, deleteAddressQuery, getAddressByIDQuery, getAllAddressQuery, updateAddressQuery } from "./address.query.js";

export const addAddressService = async (user_id, address) => {
    if (!address.line1 || !address.landmark || !address.city || !address.state || !address.pincode) throw new AppError("Line 1, Landmark, city, state, pincode are required")
    validateLocation(address.state, address.city);
    const addAddrss = await addAddressQuery(user_id, address);
    if (!addAddrss) throw new AppError("Faild to add address", 500)
    return addAddrss;
}

export const getAllAddressService = async (user_id) => {
    const getAddress = await getAllAddressQuery(user_id);
    if (!getAddress) throw new AppError("Faild to fetch address", 500);
    if (getAddress.length === 0) throw new AppError("No address found", 404)

    return getAddress;
}

export const getAddressByIDService = async (id, user_id) => {
    const checkAddress = await checkAddressQuery(id, user_id);
    if (checkAddress.length === 0) throw new AppError("Address not found", 404);

    const getAddress = await getAddressByIDQuery(id, user_id);
    if (!getAddress) throw new AppError("Faild to fetch address", 500);

    return getAddress;
}

export const updateAddressService = async (id, user_id, address) => {
    const checkAddress = await checkAddressQuery(id, user_id);
    if (checkAddress.length === 0) throw new AppError("Address not found", 404);

    const updateAddress = await updateAddressQuery(id, user_id, address);
    if (!updateAddress) throw new AppError("Faild to update address", 500);

    return updateAddress;
}

export const deleteAddressService = async (id, user_id) => {
    const checkAddress = await checkAddressQuery(id, user_id);
    if (checkAddress.length === 0) throw new AppError("Address not found", 404);

    const deleteAddress = await deleteAddressQuery(id, user_id);
    if (!deleteAddress) throw new AppError("Faild to delete address", 500);

    return deleteAddress
}