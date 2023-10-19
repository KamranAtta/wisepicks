/* eslint-disable camelcase */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification,
} from 'antd';
import { Fragment, useState, useEffect } from 'react';
import {
  getClients,
  getSkills,
  getTeams,
  getProject,
  editProject,
  getProjectResourceAllocation,
} from '../../../apis/index';
import Loader from '../../common/Loader';
import Title from 'antd/lib/typography/Title';
import AddClient from '../../Drawer/AddClient';
import { PROJECT_QUERY_INITIAL, MESSAGES, FORMATS } from '../../../utils/constant';
import { client } from '../interfaces/clientInterface';
import { team } from '../interfaces/teamInterface';
import { skill } from '../interfaces/skillInterface';
import TypographyTitle from '../../common/Title';
import dayjs from 'dayjs';
import { useLogout } from '../../../hooks/useLogout';
import { useNavigate, useParams } from 'react-router-dom';

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
  padding: {
    paddingLeft: '10px',
  },
  heading: {
    fontWeight: '200',
    fontSize: '14px',
  },
  parentDivPadding: {
    padding: '10px',
  },
  noDisplay: {
    display: 'none',
  },
  addResourceDateStyle: { minWidth: '100px', width: 'auto' },
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

interface response {
  statusCode: number;
  data: [];
}

const EditProjectForm = () => {
  const [clients, setClients] = useState<client[]>([]);
  const [teams, setTeams] = useState<team[]>([]);
  const [technologies, setTechnologies] = useState<skill[]>([]);
  const [clientFormOpen, setClientFormOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loader, setLoader] = useState<boolean>(false);
  const getProjectDetailsFunction = async () => {
    setLoader(true);
    const queryParams = {
      ...PROJECT_QUERY_INITIAL.query,
      id: id,
    };
    queryParams;
    const response: any = await getProject(queryParams?.id as string);
    if (response.statusCode != 200) {
      if (response == 401) {
        logout();
      }
      notification.open({
        message: MESSAGES.ERROR,
      });
      return;
    }

    const data = response.data;
    data;
    data?.start_date != null ? (data.start_date = dayjs(data.start_date)) : null;
    data?.end_date != null ? (data.end_date = dayjs(data.end_date)) : null;
    const domains = [...data.domain];
    data.project_duration = [data?.start_date, data?.end_date];
    data.domain = domains.map((item) => ({
      label: item.value,
      id: item.id,
    }));
    const response2: any = await getProjectResourceAllocation(queryParams?.id as string);

    const projectResources = response2?.data;

    data.projectResources = projectResources.map((item: any) => {
      const start_date = item.start_date ? dayjs(item.start_date) : null;
      const end_date = item.end_date ? dayjs(item.end_date) : null;
      return {
        ...item,
        start_date: start_date,
        end_date: end_date,
        date_range: [start_date, end_date],
      };
    });

    ('data is');
    data;
    form.setFieldsValue(data);
    setLoader(false);
  };
  const getClientTypes = async () => {
    const data: client[] = await getClients();
    setClients(data);
  };

  const getTeamTypes = async () => {
    const data: team[] = await getTeams();
    setTeams(data);
  };

  const getTechnologiesTypes = async () => {
    const res: skill[] = await getSkills();
    setTechnologies(res);
  };

  useEffect(() => {
    getProjectDetailsFunction();
    getClientTypes();
    getTechnologiesTypes();
    getTeamTypes();
  }, []);

  const onFinish = async (values: any) => {
    setLoader(true);
    values.start_date =
      values.project_duration != undefined
        ? values.project_duration[0].format(FORMATS.DATE_FORMAT)
        : null;
    values.end_date =
      values.project_duration != undefined
        ? values.project_duration[1].format(FORMATS.DATE_FORMAT)
        : null;
    const proResources = values?.projectResources?.map((item: any) => {
      return {
        ...item,
        start_date: item.date_range ? item?.date_range[0]?.format(FORMATS.DATE_FORMAT) : null,
        end_date: item.date_range ? item?.date_range[1]?.format(FORMATS.DATE_FORMAT) : null,
      };
    });
    values.projectResources = proResources ?? [];

    values.domain = values?.domain.map((item: any) => item?.id);
    values;
    values = { ...values, id: id };
    const response: response = await editProject(values);
    if (response.statusCode == 200) {
      notification.open({
        message: MESSAGES.PROJECT_EDIT_SUCCESS,
      });
      setLoader(false);
      // navigate('/projects');
      getProjectDetailsFunction();
      navigate('/project/' + id);
    } else {
      if (response.statusCode == 401) {
        logout();
      }
      setLoader(false);
      notification.open({
        message: MESSAGES.ERROR,
      });
    }
  };

  return (
    <div style={styles.parentDivPadding}>
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

        <Form.Item
          name='client'
          label='Client Name'
          rules={[{ required: true, message: 'Please select a client or add one!' }]}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='client_id'
                // rules={[{ required: true, message: 'Please select a client or add one!' }]}
              >
                <Select
                  options={clients.map((client: client) => ({
                    label: client.name,
                    value: client.id,
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
          name='project_type'
          label='Project Type'
          rules={[
            {
              required: true,
              message: 'Please select project type!',
            },
          ]}
        >
          <Select
            placeholder='Select a Type'
            options={[
              {
                label: 'Scoped',
                value: 'Scoped',
              },
              {
                label: 'Recurring',
                value: 'Recurring',
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item label='Project Details'>
          <Row>
            <Col>
              <TypographyTitle level={5} style={styles.heading}>
                Duration
              </TypographyTitle>
              <Form.Item
                name={'project_duration'}
                rules={[
                  {
                    required: false,
                    message: 'Please select date',
                  },
                ]}
              >
                <DatePicker.RangePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label='Resources'>
          <Form.List name='projectResources'>
            {(fields, { add, remove }) => (
              <>
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
                            <Form.Item {...restField} name={[name, 'resource', 'name']}>
                              <Input disabled />
                            </Form.Item>
                            <TypographyTitle level={5} style={styles.heading}>
                              Duration
                            </TypographyTitle>
                            <Form.Item
                              name={[name, 'date_range']}
                              rules={[
                                {
                                  required: false,
                                  message: 'Please select date',
                                },
                              ]}
                            >
                              <DatePicker.RangePicker />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              {...restField}
                              name={[name, 'team_id']}
                              rules={[{ required: true, message: 'Please select a team!' }]}
                              style={styles.addResourceDateStyle}
                            >
                              <Select
                                placeholder='Select Team'
                                options={teams.map((item: team) => ({
                                  label: item.name,
                                  value: item.id,
                                  key: item.id,
                                }))}
                              ></Select>
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              {...restField}
                              name={[name, 'resource_type']}
                              rules={[{ required: true, message: 'Please select resource type!' }]}
                            >
                              <Select
                                placeholder='Select resource type...'
                                options={[
                                  {
                                    label: 'Planned',
                                    value: 'Planned',
                                  },
                                  {
                                    label: 'Planned/Shadow',
                                    value: 'Planned/Shadow',
                                  },
                                  {
                                    label: 'Additional',
                                    value: 'Additional',
                                  },
                                ]}
                              ></Select>
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              {...restField}
                              name={[name, 'level']}
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
                              name={[name, 'fte']}
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
                                    label: '10%',
                                    value: 10,
                                  },
                                  {
                                    label: '20%',
                                    value: 20,
                                  },
                                  {
                                    label: '30%',
                                    value: 30,
                                  },
                                  {
                                    label: '40%',
                                    value: 40,
                                  },
                                  {
                                    label: '50%',
                                    value: 50,
                                  },
                                  {
                                    label: '60%',
                                    value: 60,
                                  },
                                  {
                                    label: '70%',
                                    value: 70,
                                  },
                                  {
                                    label: '80%',
                                    value: 80,
                                  },
                                  {
                                    label: '90%',
                                    value: 90,
                                  },
                                  {
                                    label: '100%',
                                    value: 100,
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
                    </Fragment>
                  </>
                ))}
                <Form.Item>
                  <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                    Add a Resource
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item name='domain' label='Technologies'>
          <Select
            mode='multiple'
            placeholder='Select Technologies'
            options={technologies.map((item: skill) => ({
              value: item.id,
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
          setClientFormOpen={setClientFormOpen}
          onClose={() => setClientFormOpen(false)}
          setClients={setClients}
          clients={clients}
        ></AddClient>
      )}
      <Row style={styles.center}>{loader ? <Loader /> : <></>}</Row>
    </div>
  );
};

export default EditProjectForm;
