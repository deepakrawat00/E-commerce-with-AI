import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import routes from './modules/routes.js';

const app = express();

app.use(express.json());

app.use(compression());
app.use(cookieParser());

app.use(routes);


export default app;