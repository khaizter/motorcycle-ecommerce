import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';

import { FormikProps } from 'formik';
import { fieldsInterface, fields } from './model';

interface propType {
  formikProps: any;
  name: string;
  label: string;
  type: string;
}

const CustomFormControl: React.FC<propType> = props => {
  return (
    <FormControl variant='outlined'>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <OutlinedInput
        id={props.name}
        name={props.name}
        type={props.type}
        label={props.label}
        value={props.formikProps.values[props.name]}
        onChange={props.formikProps.handleChange}
        onBlur={props.formikProps.handleBlur}
        error={props.formikProps.touched[props.name] && Boolean(props.formikProps.errors[props.name])}
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
