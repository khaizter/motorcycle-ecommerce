import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import React from 'react';

type Option = {
  value: string;
  label: string;
};

interface propType {
  formikProps: any;
  name: string;
  label: string;
  options: Array<Option>;
}

const CustomFormControlSelect: React.FC<propType> = props => {
  const changeHandler = (e: any) => {
    console.log(e);
  };

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <Select
        labelId={props.name}
        id={props.name}
        name={props.name}
        label={props.label}
        value={props.formikProps.values[props.name]}
        onChange={props.formikProps.handleChange}
        onBlur={props.formikProps.handleBlur}
        error={props.formikProps.touched[props.name] && Boolean(props.formikProps.errors[props.name])}
      >
        {props?.options?.map(option => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      {props.formikProps.touched[props.name] && Boolean(props.formikProps.errors[props.name]) && (
        <FormHelperText id={props.name + '-helper-text'} error>
          {props.formikProps.errors[props.name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomFormControlSelect;
