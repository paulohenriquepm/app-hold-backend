import { Router } from 'express';

import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';

import { sessionsRouter } from './session.routes';
import { assetsRouter } from './assets.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/assets', ensureAuthenticated, assetsRouter);

export { routes };
