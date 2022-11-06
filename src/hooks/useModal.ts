import React, { useState } from 'react';

const useModal = (initialState: boolean = false): [boolean, () => void, () => void] => {
  const [open, setOpen] = useState<boolean>(initialState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return [open, handleOpen, handleClose];
};

export default useModal;
