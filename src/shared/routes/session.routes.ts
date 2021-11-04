import { Router } from 'express';

import { authenticateUserController } from '@modules/users/useCases/authenticateUser';
import { createUserController } from '@modules/users/useCases/createUser';

const sessionsRouter = Router();

sessionsRouter.post('/signup', (request, response) => {
  return createUserController.handle(request, response);
});
sessionsRouter.post('/signin', (request, response) => {
  return authenticateUserController.handle(request, response);
});

export { sessionsRouter };
