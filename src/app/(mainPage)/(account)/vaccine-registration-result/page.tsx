'use client';
import { useFetchAllQuery } from '@/api/vaccination-registration';
import VaccinationResultTable from '@/components/account/VaccinationResultTable';
import { LinearProgress } from '@mui/material';

export default function VaccineRegistrationResult() {
  const { data, isLoading } = useFetchAllQuery({ page: 1 });
  if (isLoading) return <LinearProgress />;
  return <VaccinationResultTable data={data?.data} />;
}
