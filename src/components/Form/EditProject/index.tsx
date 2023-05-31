import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select, Space, Divider } from 'antd';
import { Fragment, useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  getProjectLeads,
  getClients,
  getTechnologies,
  getProjectDetails,
  editProject,
} from '../../../apis/index';
import AlertBox from '../../common/Alert';
import Loader from '../../common/Loader';
import Title from 'antd/lib/typography/Title';
import AddClient from '../../Drawer/AddClient';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MESSAGES } from '../../../utils/constant';

const { RangePicker } = DatePicker;

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

const EditProjectForm = () => {
  const [clients, setClients] = useState<any>([]);
  const [clientFormOpen, setClientFormOpen] = useState<boolean>(false);
  const [projectLeads, setProjectLeads] = useState<any>([]);
  const [technologies, setTechnologies] = useState<any>([]);
  const [form] = Form.useForm();
  const [alertBoxState, setAlertBoxState] = useState<any>({
    message: '',
    type: '',
  });
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const getProjectDetailsFunction = async (projectId: number) => {
    const data: any = await getProjectDetails(projectId);
    data.projectStartEndDateRange = [
      moment(data.projectStartEndDateRange[0]),
      moment(data.projectStartEndDateRange[1]),
    ];
    data.projectLeadStartEndDateRange = [
      moment(data.projectLeadStartEndDateRange[0]),
      moment(data.projectLeadStartEndDateRange[1]),
    ];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let index = 0;
    data.resources.forEach((element: any) => {
      element.resourceStartEndDateRange[0] = moment(element.resourceStartEndDateRange[0]);
      element.resourceStartEndDateRange[1] = moment(element.resourceStartEndDateRange[1]);
      index++;
    });
    form.setFieldsValue(data);
    setLoader(false);
  };
  const getClientTypes = async () => {
    const res: any = await getClients();
    if (res.status == 200) {
      setClients(res.data.data);
    }
  };
  const getProjectLeadTypes = async () => {
    const res: any = await getProjectLeads();
    // console.log(res);
    if (res.status == 200) {
      setProjectLeads(res.data.data);
    }
  };
  const getTechnologiesTypes = async () => {
    const res: any = await getTechnologies();
    // console.log(res);
    if (res.status == 200) {
      setTechnologies(res.data.data);
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId: any = urlParams.get('id');
    getProjectDetailsFunction(projectId);
    getClientTypes();
    getProjectLeadTypes();
    getTechnologiesTypes();
  }, []);
  const onFinish = async (values: any) => {
    // console.log('Success:', values)
    setLoader(true);
    const response: any = await editProject(values);
    if (response.status == 200) {
      setAlertBoxState({ message: 'Project Has Been Edited', type: 'success' });
      setLoader(false);
      navigate('/projects');
    } else {
      setAlertBoxState({ message: 'Some Error Occured', type: 'error' });
      setLoader(false);
    }
  };

  // useEffect(() => { console.log({ projectLeads }) }, [projectLeads])

  return (
    <div>
      <Row style={{ marginBottom: 16 }}>
        <Col
          span={24}
          style={{
            marginBottom: 16,
            ...styles.center,
          }}
        >
          <Title level={3}>Edit Project</Title>
        </Col>
      </Row>
      <Form {...formItemLayout} form={form} name='editProject' onFinish={onFinish}>
        <Form.Item
          name='name'
          label='Project Name'
          rules={[
            {
              required: true,
              message: 'Please enter a name for the Project!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='client' label='Client Name'>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='client'
                rules={[{ required: true, message: 'Please select a client or add one!' }]}
              >
                <Select
                  options={clients.map((client: any) => ({
                    label: client.name,
                    value: client.name,
                    key: client.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => setClientFormOpen(true)}
              >
                Add a Client
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name='type'
          label='Project Type'
          rules={[
            {
              required: true,
              message: 'Please select project type',
            },
          ]}
        >
          <Select
            placeholder='Select a Type'
            options={[
              {
                label: 'Scoped',
                value: 'scoped',
              },
              {
                label: 'Recurring',
                value: 'recurring',
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item label='Project Details'>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Col>
              <Form.Item
                name='projectStartEndDateRange'
                rules={[
                  {
                    required: true,
                    message: 'Please select date',
                  },
                ]}
              >
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label='Resources'>
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
        <Form.Item label='Project Lead'>
          <Space style={styles.projectLeadForm}>
            <Form.Item
              name='projectLead'
              rules={[{ required: true, message: 'Please select a project lead' }]}
            >
              <Select
                placeholder='Select Project Lead'
                options={projectLeads.map((leads: any) => ({
                  value: leads.name,
                  key: leads.id,
                  label: leads.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name='projectLeadStartEndDateRange'
              rules={[{ required: true, message: 'Please select a start Date and end Date' }]}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item
              name='hoursPerWeek'
              rules={[{ required: true, message: 'Please select allocation hours' }]}
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
          </Space>
        </Form.Item>
        <Form.Item
          name='technologies'
          label='Technologies'
          rules={[{ required: true, message: 'Please select atleast two technologies' }]}
        >
          <Select
            mode='multiple'
            placeholder='Select Technologies'
            options={technologies.map((item: any) => ({
              value: item.name,
              key: item.id,
              label: item.name,
            }))}
          ></Select>
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
                  Edit Project
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Space>
      </Form>
      {clientFormOpen && (
        <AddClient
          title='Add Client'
          open={clientFormOpen}
          setAlertBoxState={setAlertBoxState}
          setClientFormOpen={setClientFormOpen}
          onClose={() => setClientFormOpen(false)}
          setClients={setClients}
          clients={clients}
        ></AddClient>
      )}
      <Row style={styles.center}>
        {alertBoxState ? (
          <AlertBox message={alertBoxState.message} type={alertBoxState.type} />
        ) : (
          <></>
        )}
        {loader ? <Loader /> : <></>}
      </Row>
    </div>
  );
};

export default EditProjectForm;
