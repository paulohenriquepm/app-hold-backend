interface ISendForgotPasswordEmailUserUseCase {
  execute(email: string): Promise<void>;
}

export { ISendForgotPasswordEmailUserUseCase };
