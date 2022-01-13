import { IAssetsRepository } from '@modules/assets/repositories/IAssetsRepository';
import { IYahooApiResponse } from '@modules/yahooApi/useCases/importData/IYahooApiResponse';
import { IUpdateAssetUseCase } from '@modules/assets/useCases/updateAsset/IUpdateAssetUseCase';
import { yahooApi } from '@modules/yahooApi/api/yahooApi';

class UpdatePriceFromAssets {
  constructor(
    private assetsRepository: IAssetsRepository,
    private updateAssetUseCase: IUpdateAssetUseCase,
  ) {}

  async execute(): Promise<void> {
    const assets = await this.assetsRepository.list({});

    for (let i = 0; i < assets.length; i++) {
      const assetToUpdate = assets[i];

      const assetInfoFromApi = (await yahooApi.get(
        `/${assetToUpdate.api_ticket}?modules=price`,
      )) as IYahooApiResponse;

      await this.updateAssetUseCase.execute(assetToUpdate.id, {
        price:
          assetInfoFromApi.data.quoteSummary.result[0].price.regularMarketPrice
            .raw,
      });
    }
  }
}

export { UpdatePriceFromAssets };
