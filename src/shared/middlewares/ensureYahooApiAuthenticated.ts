import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import auth from '@shared/config/auth';

interface IPayload {
  sub: string;
}

export async function ensureYahooApiAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    throw new AppError('Token de autenticação está faltando', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    console.log(user_id);
    if (user_id != '1') throw new AppError('Usuário não possui permissão', 401);

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Token de autenticação inválido', 401);
  }
}
