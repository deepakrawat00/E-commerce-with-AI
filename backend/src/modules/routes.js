import { Router } from 'express';
import imageRoutues from './images/image.routes.js';
import config from '../config/env.config.js';
import userRoutes from './users/admin/user.routes.js';
import authRouter from './users/auth/auth.routes.js';

const routes = Router();
const api = '/api/' + config.API_VERSION;

routes.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Base route"
    })
})

routes.use(api + '/images', imageRoutues);
// User rotes
routes.use(api + '/admin/users', userRoutes);
routes.use(api + '/auth', authRouter);

routes.use((error, req, res, next) => {
    console.log(error)
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error"
    })
});

export default routes;