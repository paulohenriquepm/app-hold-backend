import { Router } from 'express';

import { sendForgotPasswordEmailController } from '@modules/users/useCases/sendForgotPasswordEmail';
import { resetPasswordController } from '@modules/users/useCases/resetPassword';

const usersPasswordRouter = Router();

usersPasswordRouter.post('/forgot', (request, response) => {
  return sendForgotPasswordEmailController.handle(request, response);
});
usersPasswordRouter.post('/reset', (request, response) => {
  return resetPasswordController.handle(request, response);
});

export { usersPasswordRouter };
