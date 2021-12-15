import { Router } from 'express';

import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { ensureYahooApiAuthenticated } from '@shared/middlewares/ensureYahooApiAuthenticated';

import { sessionsRouter } from './session.routes';

import { yahooApiRouter } from './yahooApi.routes';

import { assetsRouter } from './assets.routes';
import { usersRouter } from './users.routes';

import prisma from '@shared/db/prisma';

const routes = Router();

const test = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/yahooApi', ensureYahooApiAuthenticated, yahooApiRouter);

routes.use('/assets', ensureAuthenticated, assetsRouter);
routes.use('/users', ensureAuthenticated, usersRouter);

routes.get('/listAssetsData', async (request, response) => {
  const assets = await prisma.assetData.findMany();

  return response.json(assets);
});

export { routes };
