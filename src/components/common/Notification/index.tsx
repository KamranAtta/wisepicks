import { notification } from 'antd';

export interface NotificationHandlerProps {
  type: 'destroy' | 'open' | 'success' | 'info' | 'error' | 'warning';
  duration?: number;
  message: string;
  description: string;
}

export default function NotificationComponent() {
  const [api, contextHolder] = notification.useNotification();

  const notificationHandler = ({
    duration = 2,
    message,
    description,
    type,
  }: NotificationHandlerProps) => {
    const NotificationBar = api[type];
    NotificationBar({
      message,
      description,
      duration,
    } as any);
  };

  return { notificationHandler, contextHolder };
}
