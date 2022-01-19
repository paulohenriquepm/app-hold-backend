export type FilterOptions = {
  sectors: string[];
  industries: string[];
};

interface IListAssetsFilterOptionsUseCase {
  execute(): Promise<FilterOptions>;
}

export { IListAssetsFilterOptionsUseCase };
