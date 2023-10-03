/* eslint-disable camelcase */
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, notification } from 'antd';
import { useState, useEffect } from 'react';
import { createResource } from '../../../apis/index';
import { MESSAGES } from '../../../utils/constant';
import Loader from '../../common/Loader';
import Title from 'antd/lib/typography/Title';
import { getSkills } from '../../../apis/skills.api';
import { getTeams } from '../../../apis/teams.api';
import { team } from '../interfaces/teamInterface';
import { skill } from '../interfaces/skillInterface';
import { useNavigate } from 'react-router-dom';

interface response {
  statusCode: number;
  err: any;
  data: [];
}
const initialValues = {
  start_date: null,
  end_date: null,
  expected_start_date: null,
  expected_end_date: null,
  projectResources: [],
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

const AddResourceForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [teams, setTeams] = useState<team[]>([]);
  const [technologies, setTechnologies] = useState<skill[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoader(true);
    // values.start_date =
    //   values.start_date != undefined ? values.start_date.format(FORMATS.DATE_FORMAT) : null;
    // values.end_date =
    //   values.end_date != undefined ? values.end_date.format(FORMATS.DATE_FORMAT) : null;
    // values.expected_start_date =
    //   values.expected_start_date != undefined
    //     ? values.expected_start_date.format(FORMATS.DATE_FORMAT)
    //     : null;
    // values.expected_end_date =
    //   values.expected_end_date != undefined
    //     ? values.expected_end_date.format(FORMATS.DATE_FORMAT)
    //     : null;
    const response: response = await createResource(values);

    if (response.statusCode == 200) {
      notification.open({
        message: MESSAGES.RESOURCE_ADD_SUCCESS,
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
    getTeamTypes();
    getTechnologiesTypes();
  }, []);

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
          <Title level={3}>Add New Resource</Title>
        </Col>
      </Row>
      <Form
        {...formItemLayout}
        form={form}
        name='addResource'
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name='name'
          label='Resource Name'
          rules={[
            {
              required: true,
              message: 'Please enter a name for the Resource!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='gender' label='Select Gender'>
          <Form.Item name='gender'>
            <Select
              placeholder='Select Gender'
              options={[
                {
                  label: 'Male',
                  value: 'Male',
                },
                {
                  label: 'Female',
                  value: 'Female',
                },
                {
                  label: 'Other',
                  value: 'Other',
                },
              ]}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name='team'
          label='Select Team'
          rules={[{ required: true, message: 'Please select a team from the dropdown!' }]}
        >
          <Form.Item
            name='team_id'
            rules={[{ required: true, message: 'Please select a team from the dropdown!' }]}
          >
            <Select
              placeholder='Select Team'
              options={teams.map((item: team) => ({
                label: item.name,
                value: item.id,
                key: item.id,
              }))}
              // options={clients.map((client: client) => ({
              //   label: client.name,
              //   value: client.id,
              //   key: client.id,
              // }))}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item name='employment_status' label='Select Employment Status'>
          <Form.Item name='employment_status'>
            <Select
              placeholder='Select Employment Status'
              options={[
                {
                  label: 'Full Time',
                  value: 'Full-Time',
                },
                {
                  label: 'Part Time',
                  value: 'Part-Time',
                },
              ]}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item name='experience' label='Select Experience'>
          <Form.Item name='experience'>
            <Select
              placeholder='Select work experience'
              options={[
                {
                  label: '0 Year',
                  value: 0,
                },
                {
                  label: '1 Year',
                  value: 1,
                },
                {
                  label: '2 Years',
                  value: 2,
                },
                {
                  label: '3 Years',
                  value: 3,
                },
                {
                  label: '4 Years',
                  value: 4,
                },
                {
                  label: '5 Years',
                  value: 5,
                },
                {
                  label: '6 Years',
                  value: 6,
                },
                {
                  label: '7 Years',
                  value: 7,
                },
                {
                  label: '8 Years',
                  value: 8,
                },
                {
                  label: '9 Years',
                  value: 9,
                },
                {
                  label: '10 Years',
                  value: 10,
                },
              ]}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name='skills'
          label='Select Skills'
          rules={[{ required: true, message: 'Please select skills' }]}
        >
          <Select
            mode='multiple'
            placeholder='Select Technologies'
            options={technologies.map((item: skill) => ({
              label: item.name,
              value: item.id,
              key: item.id,
            }))}
          ></Select>
        </Form.Item>

        <Form.Item
          name={'assigned_level'}
          label='Select Designation'
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
                  Add Resource
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Space>
      </Form>
      <Row style={styles.center}>{loader ? <Loader /> : <></>}</Row>
    </div>
  );
};

export default AddResourceForm;
