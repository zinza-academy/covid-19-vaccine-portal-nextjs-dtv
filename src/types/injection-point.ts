import { IDistrict, IProvince, IWard } from '@/types/address';

export interface ISearchInjectionPointForm {
  injectionPoint: string;
}

export interface IInjectionPointColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'center';
}

export interface IInjectionPoint {
  id: string | number;
  name: string;
  street: string;
  ward: IWard;
  manager: string;
  house_number?: number;
  number_table: number;
}

export interface ICreateInjectionPoint {
  name: string;
  street: string;
  ward_id: string;
  manager: string;
  house_number?: number | null;
  number_table: number;
}

export interface ICreateInjectionPointForm {
  name: string;
  street: string;
  manager: string;
  house_number?: number | null;
  number_table: number;
  ward: string;
  district: string;
  province: string;
}

export interface IInjectionPointUpdate {
  id: string | number;
  name: string;
  manager: string;
  number_table: number;
}
export interface IInjectionPointUpdateForm {
  name: string;
  manager: string;
  number_table: number;
}
