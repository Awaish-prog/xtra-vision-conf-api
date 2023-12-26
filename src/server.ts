import express, { Express, Request } from 'express';
import route from "./routes/router";
import { connectToMongoDB } from './db/connet.db';
import cors from 'cors';
const app: Express = express();

connectToMongoDB()
app.use(express.json());
app.use(cors())
app.use(route);

export default app;