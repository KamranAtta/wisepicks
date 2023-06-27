/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  notification,
  Row,
  Select,
  Space,
} from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { requestResources, getProject, getTeams } from '../../../apis/index';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import Title from 'antd/lib/typography/Title';
import {
  ASSIGNED_LEVELS,
  FTE_RANGES,
  MESSAGES,
  PROJECT_QUERY_INITIAL,
} from '../../../utils/constant';
const { RangePicker } = DatePicker;

const styles = {
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
};
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    xs: { span: 13 },
    sm: { span: 13 },
    lg: { span: 13 },
  },
};

const RequestResourceForm = () => {
  const [projectName, setProjectName] = useState<string>('');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState<boolean>(false);
  const [teams, setTeams] = useState<[]>();

  const prefetchData = async () => {
    const teams = await getTeams();
    setTeams(teams);
  };

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId: any = urlParams.get('id');
    const data: any = await getProject(projectId as string);
    if (data.statusCode == 200) {
      setProjectName(data?.data?.name);
    } else {
      notification.open({
        message: MESSAGES.ERROR,
      });
    }
  };

  useEffect(() => {
    prefetchData();
    fetchData();
  }, []);

  useEffect(() => {
    console.log(teams);
  }, [teams]);

  const onFinish = async (values: any) => {
    setLoader(true);
    const response: any = await requestResources(values);
    if (response.status == 200) {
      notification.open({
        message: MESSAGES.RESOURCE_REQUEST_SUCCESS,
      });
      setLoader(false);
      navigate('/projects');
    } else {
      notification.open({
        message: MESSAGES.ERROR,
      });
      setLoader(false);
    }
  };

  return (
    <div>
      <Row>
        <Col span={24} style={styles.center}>
          <Title level={3}>Request Resources</Title>
        </Col>
      </Row>
      <Row style={{ marginBottom: 50 }}>
        <Col span={24} style={styles.center}>
          <Title level={5}>Project : {projectName}</Title>
        </Col>
      </Row>
      <Form
        {...formItemLayout}
        form={form}
        name='addProject'
        // initialValues={data[0]}
        onFinish={onFinish}
      >
        <Form.Item label='Resources' style={{ marginTop: -16 }}>
          <Form.List name='resources'>
            {(fields, { add, remove }) => (
              <>
                <Form.Item>
                  <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                    Add a Resource
                  </Button>
                </Form.Item>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Fragment>
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align='baseline'
                      >
                        <Row gutter={10}>
                          <Col>
                            <Form.Item
                              {...restField}
                              name={[name, 'team']}
                              rules={[{ required: true, message: 'Please select a team!' }]}
                            >
                              <Select
                                placeholder='Select a team...'
                                options={teams?.map((team: any) => ({
                                  label: (team?.name as string)?.toUpperCase(),
                                  value: team?.id,
                                }))}
                              ></Select>
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              {...restField}
                              name={[name, 'designation']}
                              rules={[{ required: true, message: 'Please select a designation!' }]}
                            >
                              <Select
                                placeholder='Select a designation...'
                                options={ASSIGNED_LEVELS?.map((level) => ({
                                  label: `${level} Engineer`,
                                  value: level,
                                }))}
                              ></Select>
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              {...restField}
                              name={[name, 'resourceStartEndDateRange']}
                              rules={[{ required: true, message: 'Please select a Date!' }]}
                            >
                              <RangePicker />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              {...restField}
                              name={[name, 'hoursPerWeek']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please select weekly allocation hours!',
                                },
                              ]}
                            >
                              <Select
                                placeholder='Select Allocation hours...'
                                options={FTE_RANGES?.map((fte) => ({
                                  label: `${fte} %`,
                                  value: fte,
                                }))}
                              ></Select>
                            </Form.Item>
                          </Col>
                          <Col style={{ marginTop: '6px' }}>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Col>
                        </Row>
                      </Space>
                      <Divider />
                    </Fragment>
                  </>
                ))}
              </>
            )}
          </Form.List>
        </Form.Item>
        <Space direction='horizontal' style={styles.center}>
          <Row gutter={24}>
            <Col>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Space>
      </Form>
      {loader ? <Loader /> : <></>}
    </div>
  );
};

export default RequestResourceForm;
