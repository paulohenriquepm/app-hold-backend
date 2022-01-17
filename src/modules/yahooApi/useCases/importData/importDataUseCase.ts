import { AxiosInstance } from 'axios';

import { CreateAssetUseCase } from '@modules/assets/useCases/createAsset/createAssetUseCase';
import { CreateAssetDataUseCase } from '@modules/assetsData/useCases/createAssetData/createAssetDataUseCase';
import { IAssetToImport } from '@modules/yahooApi/utils/IAssetToImport';
import { mapAssetToImport } from '@modules/yahooApi/utils/mapAssetToImport';

import { IImportDataUseCase } from './IImportDataUseCase';
import { IAssetsRepository } from '@modules/assets/repositories/IAssetsRepository';
import { IYahooApiResponse } from './IYahooApiResponse';
import { mapAssetDataByYearToImport } from '@modules/yahooApi/utils/mapAssetDataByYearToImport';
import { mapAssetDataByQuarterToImport } from '@modules/yahooApi/utils/mapAssetDataByQuarterToImport';

class ImportDataUseCase implements IImportDataUseCase {
  constructor(
    private assetsToImport: IAssetToImport[],
    private yahooApi: AxiosInstance,
    private assetRepository: IAssetsRepository,
    private createAssetUseCase: CreateAssetUseCase,
    private createAssetDataUseCase: CreateAssetDataUseCase,
  ) {}

  async execute() {
    for (const assetToImport of this.assetsToImport) {
      const assetAlreadyImported = await this.assetRepository.findByB3Ticket(
        assetToImport.b3_ticket,
      );

      if (assetAlreadyImported) continue;

      console.log(assetToImport.b3_ticket);
      const apiResponse = (await this.yahooApi.get(
        `/${assetToImport.api_ticket}?modules=assetProfile%2CincomeStatementHistory%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CdefaultKeyStatistics%2Cprice`,
      )) as IYahooApiResponse;

      const mappedAssetToImport = mapAssetToImport(
        assetToImport,
        apiResponse.data,
      );

      const asset = await this.createAssetUseCase.execute(mappedAssetToImport);

      const yearsToImportLength =
        apiResponse.data.quoteSummary.result[0].balanceSheetHistory
          .balanceSheetStatements.length;

      const quartersToImportLength =
        apiResponse.data.quoteSummary.result[0].balanceSheetHistoryQuarterly
          .balanceSheetStatements.length;

      for (let i = 0; i < yearsToImportLength - 1; i++) {
        const mappedAssetDataByYearToImport = mapAssetDataByYearToImport(
          asset.id,
          apiResponse.data,
          i,
        );

        await this.createAssetDataUseCase.execute(
          mappedAssetDataByYearToImport,
        );
      }

      for (let j = 0; j < quartersToImportLength; j++) {
        const mappedAssetDataByQuarterToImport = mapAssetDataByQuarterToImport(
          asset.id,
          apiResponse.data,
          j,
        );

        await this.createAssetDataUseCase.execute(
          mappedAssetDataByQuarterToImport,
        );
      }
    }

    console.log('Todos os ativos foram importados!');
  }
}

export { ImportDataUseCase };
