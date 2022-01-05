interface IDeleteUserUseCase {
  execute(user_id: number): Promise<void>;
}

export { IDeleteUserUseCase };
