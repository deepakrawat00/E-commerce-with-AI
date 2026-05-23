import { Router } from 'express';
import imageRoutues from './images/image.routes.js';
import config from '../config/env.config.js';

const routes = Router();
const api = '/api/' + config.API_VERSION;

routes.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Base route"
    })
})

routes.use(api + '/images', imageRoutues);

export default routes;