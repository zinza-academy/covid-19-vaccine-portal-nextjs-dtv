'use client';

import ConfirmForm from '@/components/vaccine-registration/ConfirmForm';
import FormInfo from '@/components/vaccine-registration/FormInfo';
import RegistrationResult from '@/components/vaccine-registration/RegistrationResult';
import { Box, Button, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react';

const steps = ['Thông tin cá nhân', 'Phiếu đồng ý tiêm', 'Hoàn thành'];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  const StepForm = () => {
    switch (activeStep) {
      case 0:
        return <FormInfo setActiveStep={setActiveStep} />;
      case 1:
        return <ConfirmForm setActiveStep={setActiveStep} />;
      case 2:
        return <RegistrationResult />;
      default:
        return <FormInfo setActiveStep={setActiveStep} />;
        break;
    }
  };

  return (
    <Stack direction="column" spacing={3} alignItems="center">
      <Stack width="100%" alignItems="center">
        <Box sx={{ width: 700 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ pb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Stack direction="column" spacing={3} width="100%">
          {StepForm()}
        </Stack>
      </Stack>
    </Stack>
  );
}
