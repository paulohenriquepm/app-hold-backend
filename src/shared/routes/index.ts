import { Router } from 'express';

import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { ensureYahooApiAuthenticated } from '@shared/middlewares/ensureYahooApiAuthenticated';

import { sessionsRouter } from './session.routes';

import { yahooApiRouter } from './yahooApi.routes';

import { assetsRouter } from './assets.routes';
import { usersRouter } from './users.routes';
import { usersWalletAssetsRouter } from './users_wallet_assets.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/yahooApi', ensureYahooApiAuthenticated, yahooApiRouter);

routes.use('/assets', ensureAuthenticated, assetsRouter);
routes.use('/users', ensureAuthenticated, usersRouter);
routes.use(
  '/users-wallet-assets',
  ensureAuthenticated,
  usersWalletAssetsRouter,
);

export { routes };
