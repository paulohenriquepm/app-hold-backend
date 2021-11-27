import { IYahooApiResponseData } from '../useCases/importData/IYahooApiResponse';

import { mapAssetDataByQuarterToImport } from './mapAssetDataByQuarterToImport';
import { mapAssetDataByYearToImport } from './mapAssetDataByYearToImport';

const mapAssetDataToImport = (
  asset_id: number,
  data: IYahooApiResponseData,
  index: number,
) => {
  const mappedAssetDataByYearToImport = mapAssetDataByYearToImport(
    asset_id,
    data,
    index,
  );

  const mappedAssetDataByQuarterToImport = mapAssetDataByQuarterToImport(
    asset_id,
    data,
    index,
  );

  return {
    mappedAssetDataByYearToImport,
    mappedAssetDataByQuarterToImport,
  };
};

export { mapAssetDataToImport };
