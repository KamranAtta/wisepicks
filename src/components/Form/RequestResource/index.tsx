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
import { requestResources, getProject, getTeams, getProjectResource } from '../../../apis/index';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import Title from 'antd/lib/typography/Title';
import {
  ASSIGNED_LEVELS,
  FTE_RANGES,
  MESSAGES,
  PROJECT_QUERY_INITIAL,
} from '../../../utils/constant';
import dayjs from 'dayjs';
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
  const [existingPlan, setExistingPlan] = useState<[]>();

  const prefetchData = async (projectId: string) => {
    const teams = await getTeams();
    const plans = await getProjectResource(projectId, { isPlan: true });
    setTeams(teams);
    setExistingPlan(plans);
  };

  const fetchData = async (projectId: string) => {
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
    const urlParams = new URLSearchParams(window.location.search);
    const projectId: any = urlParams.get('id');
    prefetchData(projectId);
    fetchData(projectId);
  }, []);

  useEffect(() => {
    /**
     * Rerender form after data fetcing to update forms's intial value
     */
    form.resetFields();
  }, [existingPlan]);

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

  const testAction = (...test: any) => {
    console.log('test actions');
    console.log(test);
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
        initialValues={{
          resources: existingPlan?.map((plan: any) => ({
            team: plan?.team_id,
            id: plan?.id,
            level: plan?.level,
            hoursPerWeek: plan?.fte,
            expectedDateRange: [
              plan?.expected_start_date ? dayjs(plan?.expected_start_date) : null,
              plan?.expected_end_date ? dayjs(plan?.expected_end_date) : null,
            ],
          })),
        }}
        onFinish={onFinish}
        onValuesChange={(_, formState) => console.log('FormState:', formState)}
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
                          {/* Team */}
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
                          {/* Level */}
                          <Col>
                            <Form.Item
                              {...restField}
                              name={[name, 'level']}
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
                          {/* Expecte date ranges */}
                          <Col>
                            <Form.Item
                              {...restField}
                              name={[name, 'expectedDateRange']}
                              rules={[{ required: true, message: 'Please select a Date!' }]}
                            >
                              <RangePicker />
                            </Form.Item>
                          </Col>
                          {/* FTE */}
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
                          {/* Delete button */}
                          <Col style={{ marginTop: '6px' }}>
                            <MinusCircleOutlined
                              onClick={() => {
                                testAction({ key, name, restField });
                                remove(name);
                              }}
                            />
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
