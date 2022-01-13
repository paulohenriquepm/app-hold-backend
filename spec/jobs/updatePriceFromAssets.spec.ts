import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { UpdatePriceFromAssets } from '@shared/jobs/updatePriceFromAssets';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { UpdateAssetUseCase } from '@modules/assets/useCases/updateAsset/updateAssetUseCase';
import { IYahooApiResponseData } from '@modules/yahooApi/useCases/importData/IYahooApiResponse';
import { AssetFactory } from '@factories/assetFactory';

const assetsRepository = new AssetsRepository();
const assetsFactory = new AssetFactory(assetsRepository);
const updateAssetUseCase = new UpdateAssetUseCase(assetsRepository);

const updatePriceFromAssets = new UpdatePriceFromAssets(
  assetsRepository,
  updateAssetUseCase,
);

const assetApiTicket = 'WEGE3.SA';
const assetPriceMocked = 1545;

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

  it('should update the asset price', async () => {
    const assetCreated = await assetsFactory.create({
      api_ticket: assetApiTicket,
      price: 10,
    });

    await updatePriceFromAssets.execute();

    const assetUpdated = await assetsRepository.findById(assetCreated.id);

    expect(assetUpdated.price).toEqual(assetPriceMocked);
  });
});
