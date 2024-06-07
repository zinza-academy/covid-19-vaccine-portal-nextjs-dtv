import { IUser } from '@/types/auth';
import { IPriorityGroup } from '@/types/priority_group';
import { IVaccinationResult } from '@/types/vaccination_result';
import { IVaccinationSession } from '@/types/vaccination_session';
import { Dayjs } from 'dayjs';

export interface IVaccineRegistrationFormData {
  group_priority: number;
  hic?: string;
  job?: string;
  working_place?: string;
  address?: string;
  appointment_date: Dayjs;
  session: number;
}

export interface IVaccinationRegistrationResult {
  id: number;
  hic?: string;
  job?: string;
  workplace?: string;
  address?: string;
  appointment_date?: string;
  user: IUser;
  priorityGroup: IPriorityGroup;
  vaccinationSession?: IVaccinationSession;
  vaccinationResult?: IVaccinationResult;
}
