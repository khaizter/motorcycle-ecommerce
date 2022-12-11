import { Box, Button, Stack, Step, StepLabel, Stepper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Level0 from 'src/pages/reset-password/level-0';
import Level1 from 'src/pages/reset-password/level-1';
import Level2 from 'src/pages/reset-password/level-2';

const levelSteps = ['Enter your email', 'Enter your recovery answer', 'Enter a new password'];

interface ResetData {
  userId: string | null;
  token: string | null;
}

const ResetForm = () => {
  const [progressLevel, setProgressLevel] = useState<number>(0);
  const [resetData, setResetData] = useState<ResetData>({ userId: null, token: null });
  const navigate = useNavigate();

  const nextHandler = (data?: any) => {
    if (progressLevel === 2) {
      console.log('changing password');
      navigate(-1);
      return;
    }
    if (data) {
      setResetData(prevState => {
        return { ...prevState, ...data };
      });
    }
    setProgressLevel(prevState => prevState + 1);
  };

  return (
    <>
      <Stepper activeStep={progressLevel} alternativeLabel>
        {levelSteps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {progressLevel === 0 && <Level0 onNext={nextHandler} resetData={resetData} />}
      {progressLevel === 1 && <Level1 onNext={nextHandler} resetData={resetData} />}
      {progressLevel === 2 && <Level2 onNext={nextHandler} resetData={resetData} />}
    </>
  );
};

export default ResetForm;
