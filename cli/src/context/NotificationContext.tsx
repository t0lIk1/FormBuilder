import { createContext, useState } from 'react';
import { Notification } from 'src/components/Notification/Notification';

type Severity = 'error' | 'success' | 'warning' | 'info';

interface NotificationContextType {
  showNotification: (message: string, severity?: Severity) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'error' as Severity,
    key: 0, // Добавляем ключ для принудительного обновления
  });

  const showNotification = (message: string, severity: Severity = 'error') => {
    setNotification(prev => ({
      open: true,
      message,
      severity,
      key: prev.key + 1,
    }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        key={notification.key}
        isOpen={notification.open}
        message={notification.message}
        severity={notification.severity}
      />
    </NotificationContext.Provider>
  );
}