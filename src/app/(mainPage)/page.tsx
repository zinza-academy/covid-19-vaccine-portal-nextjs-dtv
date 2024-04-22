'use client';

import { useFetchProfileQuery } from '@/api/auth';
import VaccinationChart from '@/components/home/VaccinationChart';
import VaccinationPoint from '@/components/home/VaccinationPoint';
import VaccinationStatistics from '@/components/home/VaccinationStatistics';
import { Box } from '@mui/material';

export default function Home() {
  const { data } = useFetchProfileQuery({ token: 'auth_token' });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <VaccinationStatistics />
      <VaccinationChart />
      <VaccinationPoint />
    </Box>
  );
}
