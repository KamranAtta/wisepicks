/* eslint-disable camelcase */
import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  Row,
  Space,
  Card,
  notification,
  Select,
} from 'antd';
import { useState } from 'react';
import Loader from '../../common/Loader';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { formItemLayout, styles } from './styles';
import { ADD_VIDEO_CATEGORY_OPTIONS, ADD_VIDEO_TYPE_OPTIONS, MESSAGES, PAGE_TITLES } from '../../../utils/constant';
import { authenticateAdmin, addVideo } from '../../../apis/fixture.api';
import LoginForm from '../Login';
import { AuthInterface } from '../Login/interface';


const VideoForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  const { md } = Grid.useBreakpoint();
  const [loader, setLoader] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [adminDetails, setAdminDetails] = useState<AuthInterface>();

  const authenticateUser = async (payload: AuthInterface) => {
    setAdminDetails(payload);
    const response = await authenticateAdmin(payload);
    if(response?.data?.authenticated){
      setAuthenticated(true);
      setLoader(false);
    } else {
      setLoader(false);
      setAuthenticated(false);
      notification.open({
        message: MESSAGES.LOGIN_ERROR,
      });
  }
  }

  const onFinish = async (values: any) => {
    setLoader(true);
    const response = await addVideo({...values, ...adminDetails});
    if(response?.statusCode === 401){
      notification.open({
        message: MESSAGES.LOGIN_ERROR,
      });
      setLoader(false);
    }else {
      if (response.err) {
        notification.open({
          message: response?.err?.message,
        });
        setLoader(false);
      } else {
        const videoId = response?.data?._id;
        navigate(`/videos/${response?.data?.category}/${videoId}`);
      }
    }
  };

  return (
    <>
      {authenticated ?
      <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
        <Card
          title={PAGE_TITLES.ADD_NEW_VIDEO}
          style={md ? styles.card : styles.formPadding}
        >
          <Form
            {...formItemLayout}
            form={form}
            className='talk-form'
            name='addUpdateTalk'
            onFinish={onFinish}
          >
            <Row gutter={24}>
              <Col span={12} xs={24} sm={12}>
                <Form.Item
                  name='type'
                  label={'Type'}
                  rules={[
                    {
                      required: true,
                      message: 'Type is required',
                    },
                  ]}
                >
                  <Select
                    placeholder={'Select Video Type'}
                    options={ADD_VIDEO_TYPE_OPTIONS}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={12} xs={24} sm={12}>
                <Form.Item
                  name='category'
                  label={'Category'}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Category is required',
                  //   },
                  // ]}
                >
                  <Select
                    placeholder={'Select Video Category'}
                    options={ADD_VIDEO_CATEGORY_OPTIONS}
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} xs={24} sm={24}>
                <Form.Item
                  name='detailsURL'
                  label={'URL'}
                >
                  <Input placeholder={'Enter movie url'} />
                </Form.Item>
              </Col>
            </Row>
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
                      {'Add'}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Space>
          </Form>
          <Row style={styles.center}>{loader ? <Loader /> : <></>}</Row>
        </Card>
      </div>: <LoginForm authenticateUser={authenticateUser}></LoginForm>
      }
    </>
  );
};
export default VideoForm;
