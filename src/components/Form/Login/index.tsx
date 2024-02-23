import { Button, Col, Form, Grid, Input, Row } from 'antd';
import { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { MailOutlined, UnlockOutlined } from '@ant-design/icons';
import logo from '../../../assets/logo/logo.png';
import { styles } from './styles';
import Loader from '../../common/Loader';
import { AuthInterface } from './interface';

const initialValues = {
  email: null,
  password: null,
};

const LoginForm = ({authenticateUser}: any) => {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState<boolean>(false);
  const { md } = Grid.useBreakpoint();

  const onFinish = async (values: AuthInterface) => {
    setLoader(true);
    const payload = { email: values?.email.toLowerCase(), password: values?.password };
    authenticateUser(payload);
    setLoader(false);
  };

  return (
    <div>
      <div>
        <div style={{...styles.loginContainer, maxWidth: md ? '30%': '90%'}}>
          <a href=''>
            <div>
              <img style={styles.centeredImage} src={logo} alt='Logo' />
            </div>
          </a>
          <Title level={3} style={styles.title}>
            Login
          </Title>
          <Form form={form} name='login' onFinish={onFinish} initialValues={initialValues}>
            <Form.Item
              name='email'
              style={styles.loginTextfield}
              rules={[
                {
                  type: 'email',
                  message: 'Please exnter a valid email address!',
                },
                {
                  required: true,
                  message: 'Please enter email address!',
                },
              ]}
            >
              <Input prefix={<MailOutlined style={styles.input} />} placeholder='Email' />
            </Form.Item>

            <Form.Item
              name='password'
              style={styles.loginTextfield}
              rules={[
                {
                  required: true,
                  message: 'Please enter a password!',
                },
              ]}
            >
              <Input.Password
                prefix={
                  <UnlockOutlined style={{color: 'black',marginRight:'8px'}} />
                }
                placeholder='Password'
              />
            </Form.Item>
            <Row justify='center'>
              <Col>
                <Form.Item>
                  <Button style={styles.loginButton} type='primary' htmlType='submit'>
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
