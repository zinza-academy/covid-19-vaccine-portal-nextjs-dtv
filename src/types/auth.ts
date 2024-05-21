import { Dayjs } from 'dayjs';
export interface IForgotPasswordForm {
  email: string;
}
export interface IUserLoginForm {
  email: string;
  password: string;
}
export interface ILoginResponse {
  token: string;
  refresh_token: string;
  token_expires: number;
  user: IUser;
}

export interface IError {
  statusCode: number;
  message?: string;
  errors?: {
    email?: string;
    password?: string;
    server?: string;
    unknown?: string;
  };
}
export interface ILoginError {
  data: IError;
  status: number;
}

export interface IRegisterError {
  statusCode: string;
  message: string;
}
export interface IUser {
  id: string | number;
  citizen_id?: string;
  email: string;
  password?: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  role: string;
  ward_id?: string | number;
}
export interface IUserRegisterForm {
  citizen_id: string;
  email: string;
  password: string;
  full_name: string;
  date_of_birth: Dayjs;
  gender: string;
  province_id: string;
  district_id: string;
  ward_id: string;
}
