import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Row, Select, Space } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { requestResources, getProjectDetails } from '../../../apis/index';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../../common/Alert';
import Loader from '../../common/Loader';
import Title from 'antd/lib/typography/Title';
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
  const [projectName, setProjectName] = useState<any>('');
  const [alertBoxState, setAlertBoxState] = useState<any>({
    message: '',
    type: '',
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId: any = urlParams.get('id');
    const fetchData = async () => {
      const data: any = await getProjectDetails(projectId);
      setProjectName(data.name);
    };
    fetchData();
  }, []);

  const onFinish = async (values: any) => {
    // console.log('Success:', values)
    setLoader(true);
    const response: any = await requestResources(values);
    if (response.status == 200) {
      setAlertBoxState({ message: 'Resources has been requested', type: 'success' });
      setLoader(false);
      navigate('/projects');
    } else {
      setLoader(false);
      setAlertBoxState({ message: 'Some Error Occured', type: 'error' });
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
                                options={[
                                  {
                                    label: 'Machine Learning',
                                    value: 'Machine Learning',
                                  },
                                  {
                                    label: 'Web',
                                    value: 'Web',
                                  },
                                  {
                                    label: 'Mobile',
                                    value: 'Mobile',
                                  },
                                ]}
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
                                options={[
                                  {
                                    label: 'L3 Engineer',
                                    value: 'L3',
                                  },
                                  {
                                    label: 'L4 Engineer',
                                    value: 'L4',
                                  },
                                  {
                                    label: 'L5 Engineer',
                                    value: 'L5',
                                  },
                                  {
                                    label: 'L6 Engineer',
                                    value: 'L6',
                                  },
                                  {
                                    label: 'L7 Engineer',
                                    value: 'L7',
                                  },
                                ]}
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
                                options={[
                                  {
                                    label: '20%',
                                    value: '20%',
                                  },
                                  {
                                    label: '50%',
                                    value: '50%',
                                  },
                                  {
                                    label: '80%',
                                    value: '80%',
                                  },
                                  {
                                    label: '100%',
                                    value: '100%',
                                  },
                                ]}
                              ></Select>
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item {...restField} name={[name, 'additional']}>
                              <Checkbox style={{ width: 'max-content', marginLeft: 16 }}>
                                Mark as Additional
                              </Checkbox>
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
      {alertBoxState ? (
        <AlertBox message={alertBoxState.message} type={alertBoxState.type} />
      ) : (
        <></>
      )}
      {loader ? <Loader /> : <></>}
    </div>
  );
};

export default RequestResourceForm;
