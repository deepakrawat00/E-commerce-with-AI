export const getUsers = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User fetched successfuly"
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