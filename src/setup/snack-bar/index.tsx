import React from 'react';
import { SnackbarProvider } from 'notistack';

interface PropType {
  children?: React.ReactElement;
}

const SnackBar: React.FC<PropType> = props => {
  return <SnackbarProvider maxSnack={3}>{props.children}</SnackbarProvider>;
};

export default SnackBar;
