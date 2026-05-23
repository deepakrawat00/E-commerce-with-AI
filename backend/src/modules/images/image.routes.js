import { Router } from "express";

const imageRoutues = Router();

imageRoutues.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Image Routes"
    })
})

export default imageRoutues;