'use client';

import VaccinationChart from '@/components/home/VaccinationChart';
import VaccinationPoint from '@/components/home/VaccinationPoint';
import VaccinationStatistics from '@/components/home/VaccinationStatistics';
import { Box, Container } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
    </Container>
  );
}
