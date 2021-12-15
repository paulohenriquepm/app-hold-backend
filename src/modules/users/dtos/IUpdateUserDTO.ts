interface IUpdateUserDTO {
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  new_password?: string;
}

export { IUpdateUserDTO };
