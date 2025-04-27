import {useEffect, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface NotificationProps {
  message: string;
  severity: 'error' | 'success' | 'warning' | 'info';
  duration?: number;
  isOpen?: boolean;
}

export const Notification = ({
                               message,
                               severity = 'error',
                               duration = 3000,
                               isOpen = false,
                             }: NotificationProps) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);

    if (isOpen) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      key={message}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{width: '100%'}}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};