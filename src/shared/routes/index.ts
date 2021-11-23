import { Router } from 'express';

import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { ensureYahooApiAuthenticated } from '@shared/middlewares/ensureYahooApiAuthenticated';

import { sessionsRouter } from './session.routes';
import { assetsRouter } from './assets.routes';
import { yahooApiRouter } from './yahooApi.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/assets', ensureAuthenticated, assetsRouter);

routes.use('/yahooApi', ensureYahooApiAuthenticated, yahooApiRouter);

export { routes };
