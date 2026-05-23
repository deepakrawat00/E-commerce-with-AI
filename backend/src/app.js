import express from 'express';
import routes from './modules/routes.js';

const app = express();

app.use(express.json());
app.use(routes);

export default app;