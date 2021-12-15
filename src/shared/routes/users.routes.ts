import { Router } from 'express';

import { updateUserController } from '@modules/users/useCases/updateUser';

const usersRouter = Router();

usersRouter.put('/update/:id', (request, response) => {
  return updateUserController.handle(request, response);
});

export { usersRouter };
