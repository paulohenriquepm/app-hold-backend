import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { UpdateInfoFromAssets } from '@shared/jobs/updateInfoFromAssets';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { AssetsDataRepository } from '@modules/assetsData/repositories/implementations/assetsDataRepository';

import { UpdateAssetUseCase } from '@modules/assets/useCases/updateAsset/updateAssetUseCase';
import { CreateAssetDataUseCase } from '@modules/assetsData/useCases/createAssetData/createAssetDataUseCase';

import { IYahooApiResponseData } from '@modules/yahooApi/useCases/importData/IYahooApiResponse';

import { AssetFactory } from '@factories/assetFactory';
import { AssetDataFactory } from '@factories/assetDataFactory';

const assetsRepository = new AssetsRepository();
const assetsDataRepository = new AssetsDataRepository();

const assetsFactory = new AssetFactory(assetsRepository);
const assetsDataFactory = new AssetDataFactory(assetsDataRepository);

const updateAssetUseCase = new UpdateAssetUseCase(assetsRepository);
const createAssetDataUseCase = new CreateAssetDataUseCase(assetsDataRepository);

const updatePriceFromAssets = new UpdateInfoFromAssets(
  assetsRepository,
  assetsDataRepository,
  updateAssetUseCase,
  createAssetDataUseCase,
);

const assetApiTicket = 'WEGE3.SA';
const assetPriceMocked = 1545;
const assetEmployeesMocked = 100;

const handlers = [
  rest.get(
    `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${assetApiTicket}`,
    (req, res, ctx) => {
      const response = {
        quoteSummary: {
          result: [
            {
              price: {
                regularMarketPrice: {
                  raw: assetPriceMocked,
                },
              },
              assetProfile: {
                sector: 'sector',
                address1: 'address1',
                city: 'city',
                state: 'state',
                country: 'country',
                zip: 'zip',
                website: 'website',
                fullTimeEmployees: assetEmployeesMocked,
                companyOfficers: [{ name: 'ceo' }],
              },
              defaultKeyStatistics: {
                sharesOutstanding: {
                  raw: 123,
                },
              },
              cashflowStatementHistory: {
                cashflowStatements: [
                  {
                    dividendsPaid: {
                      raw: 123,
                    },
                    netIncome: {
                      raw: 123,
                    },
                    totalCashFromFinancingActivities: {
                      raw: 123,
                    },
                    totalCashFromOperatingActivities: {
                      raw: 123,
                    },
                    endDate: {
                      raw: 1609372800,
                    },
                  },
                ],
              },
              cashflowStatementHistoryQuarterly: {
                cashflowStatements: [
                  {
                    dividendsPaid: {
                      raw: 123,
                    },
                    netIncome: {
                      raw: 123,
                    },
                    totalCashFromFinancingActivities: {
                      raw: 123,
                    },
                    totalCashFromOperatingActivities: {
                      raw: 123,
                    },
                    endDate: {
                      raw: 1632960000,
                    },
                  },
                ],
              },
              incomeStatementHistory: {
                incomeStatementHistory: [
                  {
                    totalRevenue: {
                      raw: 123,
                    },
                    ebit: {
                      raw: 123,
                    },
                    endDate: {
                      raw: 1609372800,
                    },
                  },
                ],
              },
              incomeStatementHistoryQuarterly: {
                incomeStatementHistory: [
                  {
                    ebit: {
                      raw: 123,
                    },
                    totalRevenue: {
                      raw: 123,
                    },
                    endDate: {
                      raw: 1632960000,
                    },
                  },
                ],
              },
              balanceSheetHistory: {
                balanceSheetStatements: [
                  {
                    cash: {
                      raw: 123,
                    },
                    minorityInterest: {
                      raw: 123,
                    },
                    totalStockholderEquity: {
                      raw: 123,
                    },
                    endDate: {
                      raw: 1609372800,
                    },
                  },
                ],
              },
              balanceSheetHistoryQuarterly: {
                balanceSheetStatements: [
                  {
                    cash: {
                      raw: 123,
                    },
                    minorityInterest: {
                      raw: 123,
                    },
                    totalStockholderEquity: {
                      raw: 123,
                    },
                    endDate: {
                      raw: 1632960000,
                    },
                  },
                ],
              },
            },
          ],
        },
      } as IYahooApiResponseData;

      return res(ctx.json(response));
    },
  ),
];

const server = setupServer(...handlers);

describe('UpdatePriceFromAssets', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  describe('when last year and quarter data does not exists', () => {
    it('should update the asset info', async () => {
      const assetCreated = await assetsFactory.create({
        api_ticket: assetApiTicket,
        employees: 10,
        price: 10,
      });

      await updatePriceFromAssets.execute();

      const assetUpdated = await assetsRepository.findById(assetCreated.id);
      const assetDataLastYear = await assetsDataRepository.findByAssetIdYear(
        assetCreated.id,
        2020,
      );
      const assetDataLastQuarter =
        await assetsDataRepository.findByAssetIdYearQuarter(
          assetCreated.id,
          2021,
          9,
        );

      expect(assetUpdated.price).toEqual(assetPriceMocked);
      expect(assetUpdated.employees).toEqual(assetEmployeesMocked);
      expect(assetDataLastYear).toHaveProperty('id');
      expect(assetDataLastQuarter).toHaveProperty('id');
    });
  });

  describe('when last year data does not exists', () => {
    it('should update the asset info', async () => {
      const assetCreated = await assetsFactory.create({
        api_ticket: assetApiTicket,
        employees: 10,
        price: 10,
      });
      const assetDataLastQuarterCreated = await assetsDataFactory.create({
        assetId: assetCreated.id,
        year: 2021,
        quarter: 9,
      });

      await updatePriceFromAssets.execute();

      const assetUpdated = await assetsRepository.findById(assetCreated.id);
      const assetDataLastYear = await assetsDataRepository.findByAssetIdYear(
        assetCreated.id,
        2020,
      );
      const assetDataLastQuarter =
        await assetsDataRepository.findByAssetIdYearQuarter(
          assetCreated.id,
          2021,
          9,
        );

      expect(assetUpdated.price).toEqual(assetPriceMocked);
      expect(assetUpdated.employees).toEqual(assetEmployeesMocked);
      expect(assetDataLastQuarter.id).toEqual(assetDataLastQuarterCreated.id);
      expect(assetDataLastYear).toHaveProperty('id');
    });
  });

  describe('when last quarter data does not exists', () => {
    it('should update the asset info', async () => {
      const assetCreated = await assetsFactory.create({
        api_ticket: assetApiTicket,
        employees: 10,
        price: 10,
      });
      const assetDataLastYearCreated = await assetsDataFactory.create({
        assetId: assetCreated.id,
        year: 2020,
        quarter: null,
      });

      await updatePriceFromAssets.execute();

      const assetUpdated = await assetsRepository.findById(assetCreated.id);
      const assetDataLastYear = await assetsDataRepository.findByAssetIdYear(
        assetCreated.id,
        2020,
      );
      const assetDataLastQuarter =
        await assetsDataRepository.findByAssetIdYearQuarter(
          assetCreated.id,
          2021,
          9,
        );

      expect(assetUpdated.price).toEqual(assetPriceMocked);
      expect(assetUpdated.employees).toEqual(assetEmployeesMocked);
      expect(assetDataLastYear.id).toEqual(assetDataLastYearCreated.id);
      expect(assetDataLastQuarter).toHaveProperty('id');
    });
  });

  describe('when last year and quarter data exists', () => {
    it('should update the asset info', async () => {
      const assetCreated = await assetsFactory.create({
        api_ticket: assetApiTicket,
        employees: 10,
        price: 10,
      });
      const assetDataLastYearCreated = await assetsDataFactory.create({
        assetId: assetCreated.id,
        year: 2020,
        quarter: null,
      });
      const assetDataLastQuarterCreated = await assetsDataFactory.create({
        assetId: assetCreated.id,
        year: 2021,
        quarter: 9,
      });

      await updatePriceFromAssets.execute();

      const assetUpdated = await assetsRepository.findById(assetCreated.id);
      const assetDataLastYear = await assetsDataRepository.findByAssetIdYear(
        assetCreated.id,
        2020,
      );
      const assetDataLastQuarter =
        await assetsDataRepository.findByAssetIdYearQuarter(
          assetCreated.id,
          2021,
          9,
        );

      expect(assetUpdated.price).toEqual(assetPriceMocked);
      expect(assetUpdated.employees).toEqual(assetEmployeesMocked);
      expect(assetDataLastYear.id).toEqual(assetDataLastYearCreated.id);
      expect(assetDataLastQuarter.id).toEqual(assetDataLastQuarterCreated.id);
    });
  });
});
