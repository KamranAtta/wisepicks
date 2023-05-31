import { Alert } from 'antd';
import propsInterface from './interface';

const AlertBox = ({ message, type }: propsInterface) => {
  return <Alert message={message} type={type} />;
};

AlertBox.defaultProps = {
  message: 'Test',
  type: 'success',
};
export default AlertBox;
