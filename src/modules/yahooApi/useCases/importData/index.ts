import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { CreateAssetUseCase } from '@modules/assets/useCases/createAsset/createAssetUseCase';
import { AssetsDataRepository } from '@modules/assetsData/repositories/implementations/assetsDataRepository';
import { CreateAssetDataUseCase } from '@modules/assetsData/useCases/createAssetData/createAssetDataUseCase';
import { yahooApi } from '@modules/yahooApi/api/yahooApi';
import { assetsToImport } from '@modules/yahooApi/utils/assetsToImport';

import { ImportDataUseCase } from './importDataUseCase';
import { YahooApiImportController } from './yahooApiImportController';

const assetsRepository = new AssetsRepository();
const assetsDataRepository = new AssetsDataRepository();

const createAssetUseCase = new CreateAssetUseCase(assetsRepository);
const createAssetDataUseCase = new CreateAssetDataUseCase(assetsDataRepository);

const importDataUseCase = new ImportDataUseCase(
  assetsToImport,
  yahooApi,
  createAssetUseCase,
  createAssetDataUseCase,
);

const yahooApiImportController = new YahooApiImportController(
  importDataUseCase,
);

export { yahooApiImportController };
