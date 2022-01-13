import cron from 'node-cron';

import { yahooApi } from '@modules/yahooApi/api/yahooApi';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { AssetsDataRepository } from '@modules/assetsData/repositories/implementations/assetsDataRepository';
import { UpdateAssetUseCase } from '@modules/assets/useCases/updateAsset/updateAssetUseCase';

import { UpdatePriceFromAssets } from './updatePriceFromAssets';
import { UpdateInfoFromAssets } from './updateInfoFromAssets';
import { CreateAssetDataUseCase } from '@modules/assetsData/useCases/createAssetData/createAssetDataUseCase';

const assetsRepository = new AssetsRepository();
const assetsDataRepository = new AssetsDataRepository();
const updateAssetUseCase = new UpdateAssetUseCase(assetsRepository);
const createAssetDataUseCase = new CreateAssetDataUseCase(assetsDataRepository);

const updatePriceFromAssets = new UpdatePriceFromAssets(
  assetsRepository,
  updateAssetUseCase,
);

const updateInfoFromAssets = new UpdateInfoFromAssets(
  assetsRepository,
  assetsDataRepository,
  updateAssetUseCase,
  createAssetDataUseCase,
);

// update asset price every hour
cron.schedule('0 * * * *', async () => await updatePriceFromAssets.execute());

// update asset info every month
cron.schedule('0 0 1 * *', async () => await updateInfoFromAssets.execute());
