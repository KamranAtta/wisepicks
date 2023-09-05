import styles from './styles';
import { Spin, SpinProps } from 'antd';

const Loader = ({ size, ...otherProps }: SpinProps) => {
  return (
    <div style={styles.loaderLayout}>
      <Spin size={size} {...otherProps} />
    </div>
  );
};

Loader.defaultProps = {
  size: 'large',
};

export default Loader;
