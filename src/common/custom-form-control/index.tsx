import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';

import { FormikProps } from 'formik';
import { fieldsInterface, fields } from './model';
import { VisibilityOff, Visibility } from '@mui/icons-material';

interface propType {
  formikProps: any;
  name: string;
  label: string;
  type: string;
  multiline?: boolean;
  hideRevealPassword?: boolean;
}

const CustomFormControl: React.FC<propType> = props => {
  const [revealPassword, setRevealPassword] = useState(false);

  const revealHandler = () => {
    setRevealPassword(prevState => !prevState);
  };

  return (
    <FormControl variant='outlined'>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <OutlinedInput
        id={props.name}
        name={props.name}
        type={revealPassword ? 'text' : props.type}
        label={props.label}
        value={props.formikProps.values[props.name]}
        onChange={props.formikProps.handleChange}
        onBlur={props.formikProps.handleBlur}
        error={props.formikProps.touched[props.name] && Boolean(props.formikProps.errors[props.name])}
        multiline={props.multiline}
        endAdornment={
          props.type === 'password' && !props.hideRevealPassword ? (
            <InputAdornment position='end'>
              <IconButton aria-label='toggle password visibility' onClick={revealHandler} edge='end'>
                {revealPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : (
            ''
          )
        }
      />
      {props.formikProps.touched[props.name] && Boolean(props.formikProps.errors[props.name]) && (
        <FormHelperText id={props.name + '-helper-text'} error>
          {props.formikProps.errors[props.name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomFormControl;
