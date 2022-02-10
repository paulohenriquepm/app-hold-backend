import { Router } from 'express';

import { updateUserController } from '@modules/users/useCases/updateUser';
import { deleteUserController } from '@modules/users/useCases/deleteUser';
import prisma from '@shared/db/prisma';

const usersRouter = Router();

usersRouter.put('/:id', (request, response) => {
  return updateUserController.handle(request, response);
});
usersRouter.delete('/:id', (request, response) => {
  return deleteUserController.handle(request, response);
});
usersRouter.get('/list/users-email', async (request, response) => {
  const emails = await prisma.user.findMany({
    select: {
      email: true,
    },
  });

  return response.json(emails);
});

export { usersRouter };
