import express, { request, response } from 'express';
import cors from 'cors';

import { routes } from './routes';

import prisma from './db/prisma';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server is running');
});
