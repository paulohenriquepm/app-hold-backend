import { yahooApi } from '@modules/yahooApi/api/yahooApi';
import { IAssetsRepository } from '@modules/assets/repositories/IAssetsRepository';
import { IYahooApiResponse } from '@modules/yahooApi/useCases/importData/IYahooApiResponse';
import { IAssetsDataRepository } from '@modules/assetsData/repositories/IAssetsDataRepository';
import { IUpdateAssetUseCase } from '@modules/assets/useCases/updateAsset/IUpdateAssetUseCase';
import { ICreateAssetDataUseCase } from '@modules/assetsData/useCases/createAssetData/ICreateAssetDataUseCase';

import { mapAssetDataToImport } from '@modules/yahooApi/utils/mapAssetDataToImport';
import { mapAssetToUpdate } from '@modules/yahooApi/utils/mapAssetToUpdate';

class UpdateInfoFromAssets {
  constructor(
    private assetsRepository: IAssetsRepository,
    private assetsDataRepository: IAssetsDataRepository,
    private updateAssetUseCase: IUpdateAssetUseCase,
    private createAssetDataUseCase: ICreateAssetDataUseCase,
  ) {}

  async execute(): Promise<void> {
    const assets = await this.assetsRepository.list({});

    for (let i = 0; i < assets.length; i++) {
      const assetToUpdate = assets[i];

      const assetInfoFromApi = (await yahooApi.get(
        `/${assetToUpdate.api_ticket}?modules=assetProfile%2CincomeStatementHistory%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CdefaultKeyStatistics`,
      )) as IYahooApiResponse;

      const mappedAssetToUpdate = mapAssetToUpdate(assetInfoFromApi.data);

      await this.updateAssetUseCase.execute(
        assetToUpdate.id,
        mappedAssetToUpdate,
      );

      const {
        mappedAssetDataByYearToImport,
        mappedAssetDataByQuarterToImport,
      } = mapAssetDataToImport(assetToUpdate.id, assetInfoFromApi.data, 0);

      const findIfExistsDataWithInLastYear =
        await this.assetsDataRepository.findByAssetIdYear(
          assetToUpdate.id,
          mappedAssetDataByYearToImport.year,
        );

      const findIfExistsDataWithInLastQuarter =
        await this.assetsDataRepository.findByAssetIdYearQuarter(
          assetToUpdate.id,
          mappedAssetDataByQuarterToImport.year,
          mappedAssetDataByQuarterToImport.quarter,
        );

      if (!findIfExistsDataWithInLastYear) {
        await this.createAssetDataUseCase.execute(
          mappedAssetDataByYearToImport,
        );
      }

      if (!findIfExistsDataWithInLastQuarter) {
        await this.createAssetDataUseCase.execute(
          mappedAssetDataByQuarterToImport,
        );
      }
    }
  }
}

export { UpdateInfoFromAssets };
