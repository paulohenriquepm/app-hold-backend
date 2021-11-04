import { Router } from 'express';

import { sessionsRouter } from './session.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

export { routes };
