import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { ImportDataUseCase } from './importDataUseCase';

class YahooApiImportController implements IController {
  constructor(private importDataUseCase: ImportDataUseCase) {}

  async handle(request: Request, response: Response) {
    await this.importDataUseCase.execute();

    return response.sendStatus(201);
  }
}

export { YahooApiImportController };
