import { Dayjs } from 'dayjs';

export interface IUpdateUser {
  citizen_id: string;
  email: string;
  full_name: string;
  date_of_birth: Dayjs;
  gender: string;
  ward_id: string;
}

export interface IUpdateUserForm {
  citizen_id: string;
  email: string;
  full_name: string;
  date_of_birth: Dayjs;
  gender: string;
  ward_id: string;
  district_id: string;
  province_id: string;
}
export interface IGender {
  id: number;
  value: string;
  name: string;
}
