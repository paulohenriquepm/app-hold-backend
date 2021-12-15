import { Request, Response } from 'express';

interface IUpdateUserController {
  handle(request: Request, response: Response): Promise<Response>;
}

export { IUpdateUserController };
