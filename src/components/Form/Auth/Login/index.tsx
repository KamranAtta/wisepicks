/* eslint-disable camelcase */
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, notification } from 'antd';
import { useState } from 'react';
import { MESSAGES } from '../../../../utils/constant';
import Loader from '../../../common/Loader';
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { loginUser } from '../../../../apis/auth.api';
import { MailOutlined, UnlockOutlined } from '@ant-design/icons';
import logo from '../../../../assets/logo/logo.png';
import './index.css';
interface response {
  statusCode: number;
  err: any;
  data: [];
  access_token: any;
}
const initialValues = {
  username: null,
  password: null,
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState<boolean>(false);
  const { token, login, logout } = useAuth();

  const onFinish = async (values: any) => {
    setLoader(true);

    if (token?.access_token) {
      logout();
      setLoader(false);
      navigate('/login');
    } else {
      const response: response = await loginUser(values);
      if (response?.access_token) {
        await login(response);
        notification.open({
          message: MESSAGES.LOGIN_SUCCESS,
        });
        setLoader(false);
        navigate('/resources');
      } else {
        if (response?.err) {
          notification.open({
            message: response?.err?.message,
          });
          setLoader(false);
        } else {
          setLoader(false);
          notification.open({
            message: MESSAGES.ERROR,
          });
        }
      }
    }
  };

  return (
    <div className='login-page'>
      <div className='login-parent'>
        <div className='login-container'>
          <a href=''>
            <div>
              <img className='centered-image' src={logo} alt='Logo' />
            </div>
          </a>
          <Title
            level={3}
            style={{
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            Login
          </Title>
          <Form form={form} name='login' onFinish={onFinish} initialValues={initialValues}>
            <Form.Item
              name='email'
              className='login-textfield'
              rules={[
                {
                  type: 'email',
                  message: 'Please enter a valid email address!',
                },
                {
                  required: true,
                  message: 'Please enter your email address!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Email'
              />
            </Form.Item>

            <Form.Item
              name='password'
              className='login-textfield'
              rules={[
                {
                  required: true,
                  message: 'Please enter a password!',
                },
                {
                  min: 8, // Minimum password length (customize as needed)
                  message: 'Password must be at least 8 characters long!',
                },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
                },
              ]}
            >
              <Input.Password
                prefix={<UnlockOutlined style={{ marginRight: '8px', color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Password'
              />
            </Form.Item>

            <Row justify='center'>
              <Col>
                <Form.Item>
                  <Button className='login-button' type='primary' htmlType='submit'>
                    Login
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Row>{loader ? <Loader /> : <></>}</Row>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
