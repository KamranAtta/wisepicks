/* eslint-disable camelcase */
import type { ColumnsType } from 'antd/es/table';
import {
  Form,
  Space,
  Table,
  Row,
  Col,
  Modal,
  DatePicker,
  Select,
  Button,
  notification,
  Input,
  Divider,
} from 'antd';
import {
  PlusOutlined,
  // MinusCircleOutlined
} from '@ant-design/icons';
import React, { Fragment, useState, useEffect, useRef } from 'react';
// import { MESSAGES } from '../../../utils/constant';
import { columnsSort } from '../utils';
import ProjectResourcesInterface, { ProjectResourceTableI } from './interface';
// eslint-disable-next-line no-duplicate-imports
import SuggestedEngineerInterface from './interface';
// import VacationTableInterface from '../../../components/Drawer/AssignProject/interfaces/vacationTableInterface';
import { getProjectDetails } from '../../../apis';
import { getSkills } from '../../../apis/skills.api';
import { getTeams } from '../../../apis/teams.api';
import {
  removeProjectResource,
  updateProjectResource,
  getProjectResourceAllocation,
  getSuggestedEngineers,
  assignResource,
  allocateResource,
} from '../../../apis/project-resource.api';
import TypographyTitle from '../../common/Title';
import TypographyText from '../../common/Text';
import NotificationComponent, { NotificationHandlerProps } from '../../common/Notification';
import {
  MESSAGES,
  // FORMATS
} from '../../../utils/constant';
import ButtonLayout from '../../../components/ButtonLayout';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../../common/Loader';
// import Title from 'antd/lib/typography/Title';
import { skill } from '../../../components/Form/interfaces/skillInterface';
import { team } from '../../../components/Form/interfaces/teamInterface';

interface response {
  statusCode: number;
  err: any;
  data: [];
}

const styles = {
  datePicker: { width: '100%' } as React.CSSProperties,
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

// const formItemLayout = {
//   labelCol: {
//     span: 6,
//   },
//   wrapperCol: {
//     xs: { span: 13 },
//     sm: { span: 13 },
//     lg: { span: 13 },
//   },
// };

const hourAvailability = [
  {
    value: '20',
    label: '2',
  },
  {
    value: '50',
    label: '4',
  },
  {
    value: '80',
    label: '6',
  },
  {
    value: '100',
    label: '8',
  },
];

// const initialValues = {
//   start_date: null,
//   end_date: null,
//   expected_start_date: null,
//   expected_end_date: null,
// };

export default function ProjectResourcesTable({ resourceQuery }: ProjectResourceTableI) {
  // const navigate = useNavigate();
  const [form] = Form.useForm();
  const resetRef = useRef(null);
  const [resources, setResources] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [project, setProject] = useState<any>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAssignResourceModal, setOpenAssignResourceModal] = useState<boolean>(false);
  const [suggestedEngineers, setSuggestedEngineers] = useState<any>();
  const [assignResourceData, setAssignResourceData] = useState<any>({});
  const { RangePicker } = DatePicker;
  const { contextHolder, notificationHandler } = NotificationComponent();
  const [availabilityOptions, setAvailabilityOptions] = useState<any>(hourAvailability);
  const [projectResourceId, setProjectResourceId] = useState<string>('');
  const [technologies, setTechnologies] = useState<skill[]>([]);
  const [teams, setTeams] = useState<team[]>([]);
  const [openAddProjectResourceModal, setOpenAddProjectResourceModal] = useState<boolean>(false);
  const [projectCompletionTime, setProjectCompletionTime] = useState<any>();
  const now = new Date();

  function convertMillisecondsToDaysHours(milliseconds: number) {
    // Calculate the number of days
    const d = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
    const days = d > 1 ? d + ' days' : d + ' day';
    // Calculate the remaining milliseconds after subtracting days
    const remainingMilliseconds = milliseconds % (24 * 60 * 60 * 1000);

    // Calculate the number of hours
    const h = Math.floor(remainingMilliseconds / (60 * 60 * 1000));
    const hours = h > 1 ? h + ' hours' : h + ' hour';

    return days + ' and ' + hours;
  }

  // const [vacationData, setVacationData] = useState<VacationTableInterface[]>([]);

  const fetchResources = async () => {
    setLoader(true);
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const projectDetails = await getProjectDetails(projectId as unknown as number);
    setProject(projectDetails?.data);
    const milliseconds = Date.parse(projectDetails?.data?.expected_end_date) - now.getTime();

    setProjectCompletionTime(convertMillisecondsToDaysHours(milliseconds));

    const allocationResources = await getProjectResourceAllocation(projectId as string);
    const resourceList = [];
    for (const projectResource of allocationResources.data) {
      const r = {
        key: projectResource.project_resource_id,
        name: projectResource?.resource_name,
        team: projectResource?.team_name,
        level: projectResource?.resource_level,
        fte: projectResource?.fte,
        joiningDate: projectResource?.start_date,
        type: projectResource?.resource_type,
        status: '',
        resourceId: projectResource?.resource_id,
        projectResourceId: projectResource?.project_resource_id,
      };
      resourceList.push(r);
    }
    setResources(resourceList);
    // setVacationData([]);
    setLoader(false);
  };

  const renderManageResource = async (data: any) => {
    let queryParams = '';
    if (data.level && data.fte) {
      queryParams += 'level=' + data.level + '&fte=' + data.fte;
    }
    const suggestedResources = await getSuggestedEngineers(queryParams);
    setSuggestedEngineers(suggestedResources.data);
    setProjectResourceId(data.projectResourceId);
    setOpenModal(true);
  };

  const removeResourcce = async (data: any) => {
    setLoader(true);
    const id = data.key;
    const response = await removeProjectResource(id, {});
    if (response) {
      await fetchResources();
      notification.open({
        message: MESSAGES.RESOURCE_REMOVE_SUCCESS,
      });
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchResources();
  }, [resourceQuery]);

  // const renderCustomCell = (object: Array<string>) => {
  //   return (
  //     <List size='small' dataSource={object} renderItem={(item) => <List.Item>{item}</List.Item>} />
  //   );
  // };

  const renderAssignResourceModal = async (data: any) => {
    setOpenAssignResourceModal(true);
    setAssignResourceData(data);
    const hoursOptions: any = [];
    hourAvailability.forEach((option) => {
      if (parseInt(data.available_fte) >= parseInt(option.value)) {
        hoursOptions.push(option);
      }
    });
    setAvailabilityOptions(hoursOptions);
    setOpenModal(false);
  };

  const formDataTransformation = (values: any) => {
    const { project, weeklyHours, ...rest } = values;
    let transformedData = { ...rest, projectId: project, fte: weeklyHours, ...rest };
    if (transformedData?.startDate) {
      transformedData = {
        ...transformedData,
        startDate: transformedData?.startDate?.toISOString(),
      };
    }
    if (transformedData?.endDate) {
      transformedData = { ...transformedData, endDate: transformedData?.endDate?.toISOString() };
    }
    if (transformedData?.expectedDate?.length > 0) {
      const expectedDate = transformedData?.expectedDate?.map((date: any) => date?.toISOString());
      transformedData.expectedStartDate = expectedDate[0];
      transformedData.expectedEndDate = expectedDate[1];
    }
    transformedData = assignResourceData?.team_id
      ? { ...transformedData, teamId: assignResourceData?.team_id }
      : transformedData;
    transformedData = assignResourceData?.assigned_level
      ? { ...transformedData, level: assignResourceData?.assigned_level }
      : transformedData;
    transformedData = { ...transformedData, projectResourceId: projectResourceId };
    return transformedData;
  };

  const onFinish = async (values: object) => {
    let notificationConfig: NotificationHandlerProps = {
      type: 'success',
      message: 'Resource Assigned',
      description: 'Resource has been assigned',
    };
    setLoader(true);
    const payload = formDataTransformation(values);
    let response: any;
    if (!payload.projectResourceId) {
      response = await assignResource(payload);
    } else {
      response = await updateProjectResource(payload.projectResourceId, payload);
    }
    // const response: any = await updateProjectResource(payload.projectResourceId, payload);
    if (response?.statusCode == 200 || response?.statusCode == 201) {
      (resetRef?.current as any)?.click();
      setOpenModal(false);
      await fetchResources();
      setOpenAssignResourceModal(false);
    } else {
      notificationConfig = {
        type: 'error',
        message: 'Error Occured',
        description: 'Error in Resource assignment',
      };
    }
    setLoader(false);
    notificationHandler(notificationConfig);
  };

  const handleCancel = () => {
    setOpenAssignResourceModal(false);
  };

  const handleOpenProjectResourceCancel = () => {
    setOpenAddProjectResourceModal(false);
  };

  const getTeamTypes = async () => {
    const data: team[] = await getTeams();
    setTeams(data);
  };
  // const getProjectLeadTypes = async () => {
  //   const res: any = await getProjectLeads();
  //   if (res.status == 200) {
  //     setProjectLeads(res.data.data);
  //   }
  // };
  const getTechnologiesTypes = async () => {
    const res: skill[] = await getSkills();
    setTechnologies(res);
  };

  const handleAddProjectResource = () => {
    getTeamTypes();
    getTechnologiesTypes();
    setOpenAddProjectResourceModal(true);
  };

  const onAddProjectResource = async (values: any) => {
    setLoader(true);
    values.start_date = values.start_date != undefined ? new Date(values.start_date) : null;
    values.end_date = values.end_date != undefined ? new Date(values.end_date) : null;
    values.expected_start_date =
      values.expected_start_date != undefined ? new Date(values.expected_start_date) : null;
    values.expected_end_date =
      values.expected_end_date != undefined ? new Date(values.expected_end_date) : null;

    values.project_id = project?.id;

    const response: response = await allocateResource(values);

    // const response: response = {
    //   statusCode: 200,
    //   err: {
    //     message: 'Error occured'
    //   },
    //   data: []
    // }
    if (response.statusCode == 201) {
      notification.open({
        message: MESSAGES.RESOURCE_ALLOCATE_SUCCESS,
      });
      setLoader(false);
      fetchResources();
      setOpenAddProjectResourceModal(false);
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

  const columns: ColumnsType<ProjectResourcesInterface> = [
    {
      title: 'Resource Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => columnsSort(a.name, b.name),
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      sorter: (a, b) => columnsSort(a.team, b.team),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      sorter: (a, b) => columnsSort(a.level, b.level),
    },
    {
      title: 'Availability(%)',
      dataIndex: 'fte',
      key: 'fte',
      sorter: (a, b) => columnsSort(a.fte, b.fte),
    },
    // {
    //   title: 'Assigned Projects',
    //   dataIndex: 'assignedProjects',
    //   key: 'assignedProjects',
    //   filters: [
    //     {
    //       text: 'Erase',
    //       value: 'Erase',
    //     },
    //     {
    //       text: 'PES Spills',
    //       value: 'PES Spills',
    //     },
    //     {
    //       text: 'SNG',
    //       value: 'SNG',
    //     },
    //   ],
    //   filterMode: 'tree',
    //   filterSearch: true,
    //   onFilter: (value, record) => {
    //     return record.assignedProjects.includes(value as string);
    //   },
    //   render: (element) => renderCustomCell(element),
    // },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        {
          text: 'Assigned',
          value: 'Assigned',
        },
        {
          text: 'Benched',
          value: 'Benched',
        },
        {
          text: 'Free',
          value: 'Free',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        return record.type.startsWith(value as string);
      },
      sorter: (a, b) => columnsSort(a.type, b.type),
    },
    {
      title: 'Action',
      key: 'action',
      render: (element) => (
        <Space size='middle'>
          {element?.resourceId ? (
            <a onClick={() => removeResourcce(element)}>Remove Resource</a>
          ) : (
            <a onClick={() => renderManageResource(element)}>Assign Resource</a>
          )}
        </Space>
      ),
    },
  ];

  const suggestedEngineersColumns: ColumnsType<SuggestedEngineerInterface> = [
    {
      title: 'Resource Name',
      dataIndex: 'resource_name',
      key: 'resource_name',
      sorter: (a, b) => columnsSort(a.resource_name, b.resource_name),
    },
    {
      title: 'Team',
      dataIndex: 'team_name',
      key: 'team_name',
      sorter: (a, b) => columnsSort(a.team_name, b.team_name),
    },
    {
      title: 'Level',
      dataIndex: 'assigned_level',
      key: 'assigned_level',
      sorter: (a, b) => columnsSort(a.assigned_level, b.assigned_level),
    },
    {
      title: 'Total Availability(%)',
      dataIndex: 'total_fte',
      key: 'total_fte',
      sorter: (a, b) => columnsSort(a.total_fte, b.total_fte),
    },
    {
      title: 'Current Availability(%)',
      dataIndex: 'available_fte',
      key: 'available_fte',
      sorter: (a, b) => columnsSort(a.available_fte, b.available_fte),
    },
    {
      title: 'Action',
      key: 'action',
      render: (element) => (
        <Space size='middle'>
          {<a onClick={() => renderAssignResourceModal(element)}>Assign Resource</a>}
        </Space>
      ),
    },
  ];

  // const vacationColumnns: ColumnsType<VacationTableInterface> = [
  //   {
  //     title: 'Type',
  //     dataIndex: 'type',
  //     key: 'type',
  //     sorter: (a, b) => columnsSort(a.type, b.type),
  //   },
  //   {
  //     title: 'Start Date',
  //     dataIndex: 'startDate',
  //     key: 'startDate',
  //     sorter: (a, b) => columnsSort(a.startDate, b.startDate),
  //   },
  //   {
  //     title: 'End Date',
  //     dataIndex: 'endDate',
  //     key: 'endDate',
  //     sorter: (a, b) => columnsSort(a.endDate, b.endDate),
  //   },
  // ];

  return (
    <>
      <Col>
        <Row gutter={12} style={{ marginBottom: 16 }}>
          <Col span={16}>
            <Space direction='vertical' size='small'>
              <Row gutter={12}>
                <Col span={12}>
                  <TypographyTitle level={5}>Project Name</TypographyTitle>
                  <TypographyText>{project?.name}</TypographyText>
                </Col>
                <Col span={8}>
                  <TypographyTitle level={5}>Client Name</TypographyTitle>
                  <TypographyText>{project?.client?.name}</TypographyText>
                </Col>
              </Row>

              <Row gutter={12}>
                <Col span={12}>
                  <TypographyTitle level={5}>Start Date</TypographyTitle>
                  <TypographyText>{project?.start_date || '-'}</TypographyText>
                </Col>
                <Col span={12}>
                  <TypographyTitle level={5}>End Date</TypographyTitle>
                  <TypographyText>{project?.end_date || '-'}</TypographyText>
                </Col>
              </Row>

              <Row gutter={12}>
                <Col span={12}>
                  <TypographyTitle level={5}>Expected Start Date</TypographyTitle>
                  <TypographyText>{project?.expected_start_date || '-'}</TypographyText>
                </Col>
                <Col span={12}>
                  <TypographyTitle level={5}>Expected End Date</TypographyTitle>
                  <TypographyText>{project?.expected_end_date || '-'}</TypographyText>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row gutter={12} style={{ marginTop: 16 }}>
          <Col span={16}>
            <Row gutter={12}>
              <Col span={12}>
                <TypographyTitle level={5}>Project Completion Time</TypographyTitle>
                <TypographyText>{projectCompletionTime}</TypographyText>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      {/* <div className='drawer-components'>
            <TypographyTitle level={5} style={{ marginBottom: '1em' }}>
              Vacations
            </TypographyTitle>
            <Table
              columns={vacationColumnns}
              dataSource={vacationData}
              bordered
              rowClassName={(record) =>
                Date.parse(record.endDate) < Date.parse(new Date().toString()) ? 'gray' : 'black'
              }
            ></Table>
      </div> */}
      <ButtonLayout
        title={
          <TypographyTitle level={3} style={{ marginTop: '0px', marginBottom: '0px' }}>
            Manage Resources for {project?.name}
          </TypographyTitle>
        }
        left={[]}
        // right={[]}
        right={[
          {
            children: 'Add Project Resource',
            props: {
              type: 'primary',
              icon: <PlusOutlined />,
              onClick: () => handleAddProjectResource(),
            },
          },
        ]}
      />
      {/* <Row style={{ marginBottom: 8 }}>
        <TypographyTitle level={4}>Manage Resources for {project?.name}</TypographyTitle>
      </Row> */}
      <>
        <Modal
          title='Manage Resources'
          centered
          visible={openModal}
          onOk={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}
          width={1000}
        >
          <Table
            columns={suggestedEngineersColumns}
            dataSource={suggestedEngineers}
            loading={loader}
            scroll={{ x: 'max-content' }}
          />
        </Modal>
      </>
      <Row>
        <Fragment>
          <Modal
            title='Assign Resource'
            centered
            visible={openAssignResourceModal}
            onCancel={handleCancel}
            footer={null}
            width={1000}
          >
            {contextHolder}
            <Form
              name='benchedResource'
              form={form}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 16 }}
              initialValues={{
                resourceId: assignResourceData?.resource_id,
                projectId: project?.id,
              }}
              autoComplete='off'
              onFinish={onFinish}
            >
              <Form.Item label='Resource Name' name='resourceId'>
                <Select
                  options={[
                    {
                      value: assignResourceData?.resource_id,
                      label: assignResourceData?.resource_name,
                    },
                  ]}
                  disabled
                />
              </Form.Item>

              {/* <Form.Item label='Project Name' name='project'>
                  <Select value={project?.name} disabled/>
                </Form.Item> */}

              <Form.Item
                label='Project Name'
                name='projectId'
                rules={[{ required: true, message: 'Please select a project!' }]}
              >
                <Select options={[{ value: project?.id, label: project?.name }]} disabled />
              </Form.Item>

              <Form.Item
                label='Weekly Hours'
                name='weeklyHours'
                rules={[{ required: true, message: 'Please select Allocation Hours!' }]}
              >
                <Select placeholder='Select Allocation Hours' options={availabilityOptions} />
              </Form.Item>

              <Form.Item
                label='Resource Type'
                name='resourceType'
                rules={[{ required: true, message: 'Please select resource type!' }]}
              >
                <Select
                  placeholder='Select resource type'
                  options={[
                    {
                      value: 'Billable',
                      label: 'Billable',
                    },
                    {
                      value: 'Non-Billable',
                      label: 'Non-Billable',
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name='expectedDate'
                label='Expected Date:'
                rules={[{ type: 'array' as const, required: true, message: 'Please select time!' }]}
              >
                <RangePicker />
              </Form.Item>

              <Form.Item name='startDate' label='Start Date:' rules={[{ type: 'object' as const }]}>
                <DatePicker style={styles.datePicker} />
              </Form.Item>
              <Form.Item name='endDate' label='End Date:' rules={[{ type: 'object' as const }]}>
                <DatePicker style={styles.datePicker} />
              </Form.Item>

              <TypographyTitle level={5}>Vacations</TypographyTitle>
              {/* <Table
                  columns={vacationColumns as any}
                  dataSource={vacationData}
                  bordered
                  rowClassName={(record: { endDate: string }) =>
                    Date.parse(record.endDate) < Date.parse(new Date().toString()) ? 'gray' : 'black'
                  }
                ></Table> */}
              <div className='drawer-content'>
                <Row justify='end' gutter={24}>
                  <Col>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type='primary' htmlType='submit'>
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type='primary' htmlType='reset' ref={resetRef}>
                        Reset
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Form>
          </Modal>
        </Fragment>
      </Row>
      <>
        <Fragment>
          <Modal
            title='Add Project Resource'
            centered
            visible={openAddProjectResourceModal}
            onCancel={handleOpenProjectResourceCancel}
            footer={null}
            width={800}
          >
            {contextHolder}
            <Form
              name='projectAdditionalResource'
              form={form}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 18 }}
              autoComplete='off'
              onFinish={onAddProjectResource}
            >
              <Space style={{ display: 'flex', marginBottom: 20, marginTop: 20 }} align='baseline'>
                <Row gutter={10}>
                  <Col>
                    <Form.Item name={'resource_name'}>
                      <Input placeholder='Resource Name' disabled />
                    </Form.Item>

                    <Form.Item
                      name={'start_date'}
                      rules={[
                        {
                          required: false,
                          message: 'Please select date',
                        },
                      ]}
                    >
                      <DatePicker placeholder='Start Date' />
                    </Form.Item>

                    {/* <TypographyTitle level={5} style={styles.heading}>
                      Expected Start Date
                    </TypographyTitle>
                    <Form.Item
                      name={'expected_start_date'}
                      rules={[
                        {
                          required: true,
                          message: 'Please select date',
                        },
                      ]}
                    >
                      <DatePicker placeholder='Expected Start Date' />
                    </Form.Item>

                    <TypographyTitle level={5} style={styles.heading}>
                      Expected End Date
                    </TypographyTitle>
                    <Form.Item
                      name={'expected_end_date'}
                      rules={[
                        {
                          required: false,
                          message: 'Please select date',
                        },
                      ]}
                    >
                      <DatePicker placeholder='Expected End Date' />
                    </Form.Item> */}
                  </Col>

                  <Col>
                    <Form.Item
                      name={'team_id'}
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

                    <Form.Item
                      name={'end_date'}
                      rules={[
                        {
                          required: false,
                          message: 'Please select date',
                        },
                      ]}
                    >
                      <DatePicker placeholder='End Date' />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      name={'skills_id'}
                      rules={[{ required: true, message: 'Please select skills' }]}
                      style={styles.addResourceDateStyle}
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
                      name={'fte'}
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
                    <Form.Item
                      name={'level'}
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
                    <Form.Item
                      name={'resource_type'}
                      rules={[{ required: true, message: 'Please select a resource type!' }]}
                    >
                      <Select
                        placeholder='Select a resource type...'
                        options={[
                          {
                            label: 'Billable',
                            value: 'Billable',
                          },
                          {
                            label: 'Additional',
                            value: 'Additional',
                          },
                          {
                            label: 'Bench',
                            value: 'Bench',
                          },
                        ]}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Space>
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
              <Divider />
            </Form>
          </Modal>
        </Fragment>
      </>
      <Table
        columns={columns}
        dataSource={resources as ProjectResourcesInterface[]}
        loading={loader}
        scroll={{ x: 'max-content' }}
        bordered
      />
    </>
  );
}