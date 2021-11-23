import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { CreateAssetUseCase } from '@modules/assets/useCases/createAsset/createAssetUseCase';
import { UpdateAssetUseCase } from '@modules/assets/useCases/updateAsset/updateAssetUseCase';
import { YahooApi } from '@modules/yahooApi/api/yahooApi';
import { companiesToImport } from '@modules/yahooApi/utils/companiesToImport';

import { ImportDataUseCase } from './importDataUseCase';
import { YahooApiImportController } from './yahooApiImportController';

const assetsRepository = new AssetsRepository();
const createAssetUseCase = new CreateAssetUseCase(assetsRepository);
const updateAssetUseCase = new UpdateAssetUseCase(assetsRepository);
const yahooApi = new YahooApi();

const importDataUseCase = new ImportDataUseCase(
  companiesToImport,
  yahooApi,
  assetsRepository,
  updateAssetUseCase,
  createAssetUseCase,
);

const yahooApiImportController = new YahooApiImportController(
  importDataUseCase,
);

export { yahooApiImportController };
