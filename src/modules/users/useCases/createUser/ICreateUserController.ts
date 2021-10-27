import { Request, Response } from 'express';

interface ICreateUserController {
  handle(request: Request, response: Response): Promise<Response>;
}

export { ICreateUserController };
