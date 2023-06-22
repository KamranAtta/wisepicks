import { notification } from 'antd';

export default function NotificationComponent() {
  const [api, contextHolder] = notification.useNotification();
  api.open({
    message: 'Notification Title',
    description:
      'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
    duration: 0,
  });

  return <>{contextHolder}</>;
}
