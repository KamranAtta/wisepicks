import { Col, Image, Row, Typography } from 'antd';
import logo from '../../assets/logo/logo.png';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function FooterComponent() {

  return (
    <Row gutter={24}>
        <Col span={4}>
            <Image width={150} src={logo} />
        </Col>
        <Col span={4}>
            <Link to={'/about-us'} >
                <Typography>About Us</Typography>
            </Link>
        </Col>
        <Col span={4}>
            <Link to={'/privacy-policy'} >
                <Typography>Privacy Policy</Typography>
            </Link>
        </Col>
        <Col span={4}>
            <Link to={'/contact'} >
                <Typography>Contact Us</Typography>
            </Link>
        </Col>
        <Col span={8}>
            <Typography>Copyright © {dayjs(new Date()).format('YYYY')} Streameast All rights reserved.</Typography>
        </Col>
    </Row>
  );
}
