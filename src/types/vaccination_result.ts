import { IUser } from '@/types/auth';
import { IInjectionPoint } from '@/types/injection-point';
import { IVaccinationRegistrationResult } from '@/types/vaccination-registration';
import { IVaccinationType } from '@/types/vaccination_type';
import { Dayjs } from 'dayjs';

export interface IVaccinationResult {
  id: number;
  lot: number;
  time: string;
  vaccinationSite: IInjectionPoint;
  vaccinationType: IVaccinationType;
  user: IUser;
  vaccinationRegistration: IVaccinationRegistrationResult;
}

export interface ICreateVaccinationResult {
  lot: number;
  time: Dayjs;
  vaccination_site_id: number;
  vaccination_type_id: number;
  user_id: number;
  vaccination_registration_id: number;
}

export interface ICreateVaccinationResultForm {
  lot: number;
  time: Dayjs;
  vaccination_type_id: number;
  vaccination_site_id: number;
}
