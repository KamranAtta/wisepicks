/* eslint-disable camelcase */
import {
  Button,
  Col,
  DatePicker,
  Form,
  Grid,
  Input,
  Row,
  Space,
  Card,
  notification,
} from 'antd';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { formItemLayout, styles } from './styles';
import { PAGE_TITLES } from '../../../utils/constant';
import { JustTalkById, createTalk, updateTalk } from '../../../apis/fixture.api';
import TextArea from 'antd/es/input/TextArea';

const TalkForm = () => {
  const [form] = Form.useForm();
  const [disableField, setDisableFiled] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  const { md } = Grid.useBreakpoint();
  const [loader, setLoader] = useState<boolean>(false);

  const getTalkById = async () => {
    setLoader(true);
    if (id) {
      const response = await JustTalkById(id as string);
      
      const data = response?.data;
      data.publishedAt = data?.publishedAt ? dayjs(new Date(data?.publishedAt)): null;
      setDisableFiled(true);
      form.setFieldsValue(data);
    } else {
      form.setFieldsValue([]);
    }
    setLoader(false);
  };

  useEffect(() => {
    getTalkById();
  }, []);

  const onFinish = async (values: any) => {
    setLoader(true);
    values.publishedAt =
      values.publishedAt != undefined
        ? new Date(values.publishedAt)
        : null;
    if (id) {
      values = { ...values, id: id };
      const response = await updateTalk(values);
      if (response.err) {
        notification.open({
          message: response?.err?.message,
        });
      } else {
        navigate(`/talks/${values?.category}/${id}`);
      }
    } else {
      const response = await createTalk(values);
      if (response.err) {
        notification.open({
          message: response?.err?.message,
        });
      } else {
        const videoId = id ?? response?.data?.id;
        navigate(`/talks/${values?.category}/${videoId}`);
      }
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
      <Card
        title={id ? PAGE_TITLES.EDIT_TALK : PAGE_TITLES.ADD_NEW_TALK}
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
            <Col span={24} xs={24} sm={24}>
              <Form.Item
                name='title'
                label={'Title'}
                rules={[
                  {
                    required: true,
                    message: 'Title is required!',
                  },
                ]}
              >
                <Input placeholder={'Title'} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={24} sm={24}>
              <Form.Item
                name='category'
                label={'Category'}
                rules={[
                  {
                    required: true,
                    message: 'Category is required!',
                  },
                ]}
              >
                <Input placeholder={'Category'} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12} xs={24} sm={12}>
              <Form.Item
                name='videoId'
                label={'Video ID'}
                rules={[
                  {
                    required: true,
                    message: 'Video ID is required!',
                  },
                ]}
              >
                <Input disabled={disableField} placeholder={'Video ID'} />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} sm={12}>
              <Form.Item
                name='channelTitle'
                label={'Channel Title'}
                rules={[
                  {
                    required: true,
                    message: 'Channel title is required!',
                  },
                ]}
              >
                <Input disabled={disableField} placeholder={'Channel Title'} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12} xs={24} sm={12}>
              <Form.Item
                name='thumbnail'
                label={'Thumbnail'}
                rules={[
                  {
                    required: true,
                    message: 'Thumbnail is required!',
                  },
                ]}
              >
                <Input disabled={disableField} placeholder={'Thumbnail'} />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} sm={12}>
              <Form.Item
                name='duration'
                label={'Duration'}
                rules={[
                  {
                    required: true,
                    message: 'Duration title is required!',
                  },
                ]}
              >
                <Input disabled={disableField} placeholder={'Duration'} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12} xs={24} sm={12}>
              <Form.Item
                name='views'
                label={'Total Views'}
                rules={[
                  {
                    required: true,
                    message: 'Total Views is required!',
                  },
                ]}
              >
                <Input placeholder={'Total Views'} />
              </Form.Item>
            </Col>
            {<Col span={12} xs={24} sm={12}>
              <Form.Item
                name='publishedAt'
                label={'Published Date'}
                rules={[
                  {
                    required: true,
                    message: 'Published Date is required!',
                  },
                ]}
              >
                <DatePicker
                  style={styles.fullWidth}
                />
              </Form.Item>
            </Col>}
          </Row>
          <Row gutter={24}>
            <Col span={24} xs={24} sm={24}>
              <Form.Item
                name='description'
                label={'Description'}
                rules={[
                  {
                    required: true,
                    message: 'Description is required!',
                  },
                ]}
              >
                <TextArea placeholder={'Description'} rows={10} />
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
                    {id ? 'Update' : 'Add'}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Space>
        </Form>
        <Row style={styles.center}>{loader ? <Loader /> : <></>}</Row>
      </Card>
    </div>
  );
};
export default TalkForm;
