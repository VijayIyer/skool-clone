import React from "react";

export default function useModalController() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return [open, handleOpen, handleClose];
}
