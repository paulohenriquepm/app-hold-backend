import { AxiosInstance } from 'axios';

import { CreateAssetUseCase } from '@modules/assets/useCases/createAsset/createAssetUseCase';
import { CreateAssetDataUseCase } from '@modules/assetsData/useCases/createAssetData/createAssetDataUseCase';
import { IAssetToImport } from '@modules/yahooApi/utils/IAssetToImport';
import { MapAssetToImport } from '@modules/yahooApi/utils/mapAssetToImport';
import { mapAssetDataToImport } from '@modules/yahooApi/utils/mapAssetDataToImport';

import { IImportDataUseCase } from './IImportDataUseCase';

class ImportDataUseCase implements IImportDataUseCase {
  constructor(
    private assetsToImport: IAssetToImport[],
    private yahooApi: AxiosInstance,
    private mapAssetToImport: MapAssetToImport,
    private createAssetUseCase: CreateAssetUseCase,
    private createAssetDataUseCase: CreateAssetDataUseCase,
  ) {}

  async execute() {
    this.assetsToImport.forEach(async assetToImport => {
      const apiResponse = await this.yahooApi.get(
        `/${assetToImport.api_ticket}?modules=assetProfile%2CincomeStatementHistory%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly`,
      );

      const mappedAssetToImport = this.mapAssetToImport.execute(
        assetToImport,
        apiResponse.data,
      );

      const asset = await this.createAssetUseCase.execute(mappedAssetToImport);

      for (let index = 0; index < 4; index++) {
        const {
          mappedAssetDataByYearToImport,
          mappedAssetDataByQuarterToImport,
        } = mapAssetDataToImport(asset.id, apiResponse.data, index);

        await Promise.all([
          this.createAssetDataUseCase.execute(mappedAssetDataByYearToImport),
          this.createAssetDataUseCase.execute(mappedAssetDataByQuarterToImport),
        ]);
      }
    });
  }
}

export { ImportDataUseCase };
