interface ICreateUserForgotPasswordTokenDTO {
  token: string;
  userId: number;
  expires_at: Date;
}

export { ICreateUserForgotPasswordTokenDTO };
