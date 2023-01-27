import React from 'react';
import { SnackbarProvider } from 'notistack';

interface PropType {
  children?: React.ReactElement;
}

const SnackBar: React.FC<PropType> = props => {
  return (
    <SnackbarProvider
      classes={{ anchorOriginBottomCenter: 'container-root', containerRoot: 'container-root' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      maxSnack={3}
    >
      {props.children}
    </SnackbarProvider>
  );
};

export default SnackBar;
