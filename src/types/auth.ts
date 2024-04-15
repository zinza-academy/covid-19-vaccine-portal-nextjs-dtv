export interface IForgotPasswordForm {
  email: string;
}
export interface IUserLoginForm {
  email: string;
  password: string;
}
export interface ILoginResponse {
  id: string;
  token: string;
  email: string;
  userName: string;
}
export interface IUser {
  id: string;
  userName?: string;
  email: string;
}
