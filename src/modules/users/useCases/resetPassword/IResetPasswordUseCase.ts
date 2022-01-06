interface IResetPasswordUseCase {
  execute(token: string, email: string, password: string): Promise<void>;
}

export { IResetPasswordUseCase };
