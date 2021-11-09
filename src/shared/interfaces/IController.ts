import { Request, Response } from 'express';

interface IController {
  handle(request: Request, response: Response): Promise<Response>;
}

export { IController };
