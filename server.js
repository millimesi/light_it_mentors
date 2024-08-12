import express from 'express';
import insertRoutes from './routes/index.js';

const port = process.env.SERVER_PORT || 5000;

const api = express();

// add request body json parser
api.use(express.json());

// insert the routes
insertRoutes(api);

api.listen(port, () => {
    console.log(`API server is listening on port ${port}`);
})
