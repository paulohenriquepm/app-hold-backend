import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { CreateAssetUseCase } from '@modules/assets/useCases/createAsset/createAssetUseCase';
import { UpdateAssetUseCase } from '@modules/assets/useCases/updateAsset/updateAssetUseCase';
import { YahooApi } from '@modules/yahooApi/api/yahooApi';
import { ICompanyToImport } from '@modules/yahooApi/utils/ICompanyToImport';
import { mapAssetDataToImport } from '@modules/yahooApi/utils/mapAssetDataToImport';

import { IImportDataUseCase } from './IImportDataUseCase';
import { IYahooApiResponse } from './IYahooApiResponse';

class ImportDataUseCase implements IImportDataUseCase {
  constructor(
    private companiesToImport: ICompanyToImport[],
    private yahooApi: YahooApi,
    private assetsRepository: AssetsRepository,
    private updateAssetUseCase: UpdateAssetUseCase,
    private createAssetUseCase: CreateAssetUseCase,
  ) {}

  async execute() {
    this.companiesToImport.forEach(async company => {
      const apiResponse = (await this.yahooApi
        .initialize()
        .get(
          `/${company.api_ticket}?modules=assetProfile`,
        )) as IYahooApiResponse;

      const assetDataToImport = mapAssetDataToImport(company, apiResponse.data);

      const assetsExists = await this.assetsRepository.findByB3Ticket(
        company.b3_ticket,
      );

      if (assetsExists) {
        await this.updateAssetUseCase.execute(
          assetsExists.id,
          assetDataToImport,
        );

        return;
      }

      await this.createAssetUseCase.execute(assetDataToImport);
    });
  }
}

export { ImportDataUseCase };
