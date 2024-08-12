import express from 'express';
import insertRoutes from './routes/index.js';

const port = process.env.SERVER_PORT || 5000;

const api = express();

insertRoutes(api);

api.listen(port, () => {
    console.log(`API server is listening on port ${port}`);
})
