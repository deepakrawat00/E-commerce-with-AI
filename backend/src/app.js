import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import routes from './modules/routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());

app.use(compression());
app.use(cookieParser());

app.use(routes);
app.use(errorHandler)


export default app;