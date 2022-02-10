import { Router } from 'express';

import { updateUserController } from '@modules/users/useCases/updateUser';
import { deleteUserController } from '@modules/users/useCases/deleteUser';

const usersRouter = Router();

usersRouter.put('/:id', (request, response) => {
  return updateUserController.handle(request, response);
});
usersRouter.delete('/:id', (request, response) => {
  return deleteUserController.handle(request, response);
});

export { usersRouter };
