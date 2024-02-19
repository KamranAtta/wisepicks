import { Image, Row, Typography } from 'antd';
import logo from '../../assets/logo/logo.png';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { styles } from '../../styles';

export default function FooterComponent() {

  return (
    <Row gutter={24} style={{ display: 'felx', justifyContent: 'space-between' }}>
        <Image width={150} src={logo} />
        <Link to={'/about-us'} >
            <Typography.Text style={styles.textWhite}>About Us</Typography.Text>
        </Link>
        <Link to={'/privacy-policy'} >
            <Typography style={styles.textWhite}>Privacy Policy</Typography>
        </Link>
        <Link to={'/contact'} >
            <Typography style={styles.textWhite}>Contact Us</Typography>
        </Link>
        <Typography style={styles.textWhite}>Copyright © {dayjs(new Date()).format('YYYY')} InciteTube All rights reserved.</Typography>
    </Row>
  );
}
