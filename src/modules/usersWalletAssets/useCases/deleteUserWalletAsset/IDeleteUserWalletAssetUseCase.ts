interface IDeleteUserWalletAssetUseCase {
  execute(user_wallet_asset_id: number): Promise<void>;
}

export { IDeleteUserWalletAssetUseCase };
