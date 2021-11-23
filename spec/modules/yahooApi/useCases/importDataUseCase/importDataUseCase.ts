import { CreateAssetUseCase } from '@modules/assets/useCases/createAsset/createAssetUseCase';

import { ImportDataUseCase } from '@modules/yahooApi/useCases/importDataUseCase/importDataUseCase';
import { YahooApi } from '@modules/yahooApi/api/yahooApi';
import { ICompanyToImport } from '@modules/yahooApi/utils/ICompanyToImport';
import { UpdateAssetUseCase } from '@modules/assets/useCases/updateAsset/updateAssetUseCase';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { AssetFactory } from '@factories/assetFactory';

jest.mock('@modules/assets/useCases/createAsset/createAssetUseCase');
jest.mock('@modules/yahooApi/api/yahooApi');

let companiesToImportMock = [
  {
    name: 'Weg',
    b3_ticket: 'WEGE3',
    api_ticket: 'WEGE3.SA',
    logo: 'https://i.imgur.com/GpW6oKN.png',
  },
  {
    name: 'Ambev',
    b3_ticket: 'ABEV3',
    api_ticket: 'ABEV3.SA',
    logo: '',
  },
] as ICompanyToImport[];

const YahooApiMock = YahooApi as jest.Mock<YahooApi>;
const yahooApiMock = new YahooApiMock() as jest.Mocked<YahooApi>;

const assetsRepository = new AssetsRepository();
const assetFactory = new AssetFactory(assetsRepository);

const CreateAssetUseCaseMock =
  CreateAssetUseCase as jest.Mock<CreateAssetUseCase>;
const createAssetUseCaseMock =
  new CreateAssetUseCaseMock() as jest.Mocked<CreateAssetUseCase>;

const UpdateAssetUseCaseMock =
  UpdateAssetUseCase as jest.Mock<UpdateAssetUseCase>;
const updateAssetUseCaseMock =
  UpdateAssetUseCaseMock() as jest.Mocked<UpdateAssetUseCase>;

const importDataUseCase = new ImportDataUseCase(
  companiesToImportMock,
  yahooApiMock,
  assetsRepository,
  updateAssetUseCaseMock,
  createAssetUseCaseMock,
);

describe('importDataUseCase', () => {
  describe('when assets does not exists', () => {
    it('should call the expected services the right number of times', async () => {
      await importDataUseCase.execute();

      expect(yahooApiMock.initialize).toHaveBeenCalledTimes(2);
      expect(assetsRepository.findByB3Ticket).toHaveBeenCalledTimes(2);
      expect(updateAssetUseCaseMock.execute).not.toHaveBeenCalled();
      expect(createAssetUseCaseMock.execute).toHaveBeenCalledTimes(2);
    });
  });

  describe('when one asset exists', () => {
    it('should call the expected services the right number of times', async () => {
      await assetFactory.create({ b3_ticket: 'WEGE3' });

      await importDataUseCase.execute();

      expect(yahooApiMock.initialize).toHaveBeenCalledTimes(2);
      expect(assetsRepository.findByB3Ticket).toHaveBeenCalledTimes(2);
      expect(updateAssetUseCaseMock.execute).toHaveBeenCalledTimes(1);
      expect(createAssetUseCaseMock.execute).toHaveBeenCalledTimes(1);
    });
  });
});
