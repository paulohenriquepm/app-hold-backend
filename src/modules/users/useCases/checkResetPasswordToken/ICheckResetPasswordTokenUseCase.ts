interface ICheckResetPasswordTokenUseCase {
  execute(token: string, email: string): Promise<void>;
}

export { ICheckResetPasswordTokenUseCase };
