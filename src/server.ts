import express, { Express, Request } from 'express';
import route from "./routes/router";
import { connectToMongoDB } from './db/connet.db';
const app: Express = express();

connectToMongoDB()
app.use(express.json());
app.use(route);

export default app;