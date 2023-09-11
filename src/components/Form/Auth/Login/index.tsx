/* eslint-disable no-console */
/* eslint-disable camelcase */
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { 
    Button, 
    Col, 
    Form, 
    Input, 
    Row, 
    // Select, 
    Space, 
    notification 
} from 'antd';
import { 
    useState, 
    // useEffect 
} from 'react';
import { MESSAGES } from '../../../../utils/constant';
import Loader from '../../../common/Loader';
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

interface response {
  statusCode: number;
  err: any;
  data: [];
}
const initialValues = {
  username: null,
  password: null,
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
};
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 8 },
    lg: { span: 8 },
  },
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState<boolean>(false);
  const { user, login, logout } = useAuth();

  const onFinish = async (values: any) => {
    setLoader(true);
    console.log('Values:', values);

    if(user?.email) {
      logout();
      setLoader(false);
      navigate('/login');
    }else {
      const response: response = {data: [], statusCode: 200, err: {message: 'Error occured'}}
      // const response: response = await createResource(values);
  
      if (response.statusCode == 200) {
        await login(values);
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

//   useEffect(() => {
//     getTeamTypes();
//     getTechnologiesTypes();
//   }, []);

  return (
    <div>
      {user ? (
        <>
          <Row style={{ marginBottom: 16 }}>
            <Col
              span={24}
              style={{
                marginBottom: 16,
                ...styles.center,
              }}
            >
              <Title level={3}>Logout</Title>
            </Col>
          </Row>
          <Form
            {...formItemLayout}
            form={form}
            name='logout'
            onFinish={onFinish}
          >
            <Space direction='horizontal' style={styles.center}>
              <Row gutter={24}>
                <Col>
                  <Form.Item>
                    <Button type='primary' htmlType='submit'>
                      Logout
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Space>
          </Form>
          <Row style={styles.center}>{loader ? <Loader /> : <></>}</Row>
        </>
      ) : (
        <>
          <Row style={{ marginBottom: 16 }}>
            <Col
              span={24}
              style={{
                marginBottom: 16,
                ...styles.center,
              }}
            >
              <Title level={3}>Login</Title>
            </Col>
          </Row>
          <Form
            {...formItemLayout}
            form={form}
            name='login'
            onFinish={onFinish}
            initialValues={initialValues}
          >
            <Form.Item
              name='email'
              label='Email'
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
              <Input />
            </Form.Item>

            <Form.Item
              name='password'
              label='Passoword'
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
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
                },
              ]}
            >
            <Input.Password />
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
        </>
      )}
    </div>
  );
};

export default LoginForm;
