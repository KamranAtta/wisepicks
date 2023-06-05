import { Alert, AlertProps } from 'antd';

const AlertBox = ({ message, type }: AlertProps) => {
  return <Alert message={message} type={type} />;
};

AlertBox.defaultProps = {
  message: 'Test',
  type: 'success',
};
export default AlertBox;
