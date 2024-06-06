import { IVaccineRegistrationFormData } from '@/types/vaccination-registration';
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState: IVaccineRegistrationFormData = {
  group_priority: 1,
  hic: '',
  job: '',
  working_place: '',
  address: '',
  appointment_date: dayjs().add(1, 'day'),
  session: 1
};

export const vaccinationRegistrationSlice = createSlice({
  name: 'vaccinationRegistration',
  initialState,
  reducers: {
    createData: (state, action) => {
      state.hic = action.payload.hic;
      state.job = action.payload.job;
      state.working_place = action.payload.working_place;
      state.appointment_date = action.payload.appointment_date;
      state.address = action.payload.address;
      state.group_priority = action.payload.group_priority;
      state.session = action.payload.session;
    }
  }
});

export const { createData } = vaccinationRegistrationSlice.actions;

export default vaccinationRegistrationSlice.reducer;
