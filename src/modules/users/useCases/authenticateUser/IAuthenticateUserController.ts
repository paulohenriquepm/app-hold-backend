import { Request, Response } from 'express';

interface IAuthenticateUserController {
  handle(request: Request, response: Response): Promise<Response>;
}

export { IAuthenticateUserController };
