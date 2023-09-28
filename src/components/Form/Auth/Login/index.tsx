/* eslint-disable camelcase */
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space, notification } from 'antd';
import { useState } from 'react';
import { MESSAGES } from '../../../../utils/constant';
import Loader from '../../../common/Loader';
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { loginUser } from '../../../../apis/auth.api';
import { MailOutlined, UnlockOutlined } from '@ant-design/icons';
import logo from '../../../../assets/logo/logo.png';

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

  const styles = {
    center: {
      display: 'flex',
      justifyContent: 'center',
    },
    projectLeadForm: {
      display: 'flex',
      '@media (max-width: 1000px)': {
        display: 'none',
      },
    },
    heading: {
      fontWeight: '200',
      fontSize: '14px',
    },
    padding: {
      paddingLeft: '10px',
    },
    addResourceDateStyle: { minWidth: '60px', width: 'auto' },
    container: {
      marginTop: '50px',
      marginBottom: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #ccc', // Add a border
      borderRadius: '8px', // Add border radius for a rounded look
      padding: '20px', // Add padding for spacing
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
      transition: 'transform 0.3s', // Add animation transition
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      marginBottom: '10px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '16px',
    },
  };

  //   useEffect(() => {
  //     getTeamTypes();
  //     getTechnologiesTypes();
  //   }, []);

  return (
    <div
      style={{
        marginTop: '50px',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <a href=''>
        <div style={styles.logoContainer}>
          <img src={logo} width={150} alt='Logo' />
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
            style={{ marginLeft: '10px' }}
            prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Email'
          />
        </Form.Item>

        <Form.Item
          name='password'
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
            style={{ marginLeft: '10px' }}
            prefix={<UnlockOutlined style={{ marginRight: '8px', color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Password'
          />
        </Form.Item>

        <Space direction='horizontal' style={styles.center}>
          <Row gutter={24}>
            <Col>
              <Form.Item>
                <Button type='default' htmlType='reset'>
                  Reset
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Login
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Space>
      </Form>
      <Row style={styles.center}>{loader ? <Loader /> : <></>}</Row>
    </div>
    // <div style={{ marginTop: '50px', marginBottom: 16, }}>
    //   <Form
    //     {...formItemLayout}
    //     form={form}
    //     name='login'
    //     onFinish={onFinish}
    //     initialValues={initialValues}
    //   >
    //     <a href=''>
    //       <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
    //         <img src={logo} width={150} />
    //       </div>
    //     </a>
    //     <Row style={{ marginTop: '10px', marginBottom: 16, }}>
    //       <Col
    //         span={24}
    //         style={{
    //           marginBottom: 16,
    //           ...styles.center,
    //         }}
    //       >
    //         <Title level={3}>Login</Title>
    //       </Col>
    //     </Row>
    //     <Form.Item
    //       name='email'
    //       label='Email'
    //       rules={[
    //         {
    //           type: 'email',
    //           message: 'Please enter a valid email address!',
    //         },
    //         {
    //           required: true,
    //           message: 'Please enter your email address!',
    //         },
    //       ]}
    //     >
    //       <Input
    //         prefix={<MailOutlined style={{ marginRight: '8px', color: 'rgba(0,0,0,.25)' }} />}
    //         placeholder='Email'
    //       />
    //     </Form.Item>

    //     <Form.Item
    //       name='password'
    //       label='Passoword'
    //       rules={[
    //         {
    //           required: true,
    //           message: 'Please enter a password!',
    //         },
    //         {
    //           min: 8, // Minimum password length (customize as needed)
    //           message: 'Password must be at least 8 characters long!',
    //         },
    //         {
    //           pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
    //           message:
    //             'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
    //         },
    //       ]}
    //     >
    //       <Input.Password
    //         prefix={<UnlockOutlined style={{ marginRight: '8px', color: 'rgba(0,0,0,.25)' }} />}
    //       />
    //     </Form.Item>

    //     <Space direction='horizontal' style={styles.center}>
    //       <Row gutter={24}>
    //         <Col>
    //           <Form.Item>
    //             <Button type='default' htmlType='reset'>
    //               Reset
    //             </Button>
    //           </Form.Item>
    //         </Col>
    //         <Col>
    //           <Form.Item>
    //             <Button type='primary' htmlType='submit'>
    //               Login
    //             </Button>
    //           </Form.Item>
    //         </Col>
    //       </Row>
    //     </Space>
    //   </Form>
    //   <Row style={styles.center}>{loader ? <Loader /> : <></>}</Row>
    // </div>
  );
};

export default LoginForm;
