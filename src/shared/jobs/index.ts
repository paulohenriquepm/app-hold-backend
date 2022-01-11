import cron from 'node-cron';

import { yahooApi } from '@modules/yahooApi/api/yahooApi';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

import { UpdatePriceFromAssets } from './updatePriceFromAssets';
import { UpdateAssetUseCase } from '@modules/assets/useCases/updateAsset/updateAssetUseCase';

const assetsRepository = new AssetsRepository();
const updateAssetUseCase = new UpdateAssetUseCase(assetsRepository);
const updatePriceFromAssets = new UpdatePriceFromAssets(
  assetsRepository,
  yahooApi,
  updateAssetUseCase,
);

cron.schedule('0 * * * *', async () => await updatePriceFromAssets.execute());
