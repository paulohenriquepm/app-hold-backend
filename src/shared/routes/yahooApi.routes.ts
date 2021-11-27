import { Router } from 'express';

import { yahooApiImportController } from '@modules/yahooApi/useCases/importData';

const yahooApiRouter = Router();

yahooApiRouter.post('/import', (request, response) => {
  return yahooApiImportController.handle(request, response);
});

export { yahooApiRouter };
