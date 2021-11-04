import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { mockRequest } from '@utils/mockRequest';
import { next } from '@utils/mockNext';

describe('ensureAuthenticated', () => {
  describe('when authHeader is missing', () => {
    it('should raise an AppError', async () => {
      const request = mockRequest({
        headers: {
          authorization: '',
        },
      });

      await expect(
        ensureAuthenticated(
          request as Request,
          {} as Response,
          next as NextFunction,
        ),
      ).rejects.toEqual(
        new AppError('Token de autenticação está faltando', 401),
      );
    });
  });

  describe('when authHeader is present', () => {
    describe('when token is wrong', () => {
      it('should raise an AppError', async () => {
        const request = mockRequest({
          headers: {
            authorization: 'wrong-token',
          },
        });

        await expect(
          ensureAuthenticated(
            request as Request,
            {} as Response,
            next as NextFunction,
          ),
        ).rejects.toEqual(new AppError('Token de autenticação inválido', 401));
      });
    });
  });
});
