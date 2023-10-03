/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-duplicate-imports */
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
  Checkbox,
  List,
  Tag,
  Card,
  InputNumber,
} from 'antd';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { columnsSort } from '../utils';
import ProjectResourcesInterface, { ProjectResourceTableI } from './interface';
// eslint-disable-next-line no-duplicate-imports
import SuggestedEngineerInterface from './interface';
// import VacationTableInterface from '../../../components/Drawer/AssignProject/interfaces/vacationTableInterface';
import { getProjectDetails } from '../../../apis';
import {
  removeProjectResource,
  updateProjectResource,
  getProjectResourceAllocation,
  getSuggestedEngineers,
  assignResource,
  assignProjectResources,
} from '../../../apis/project-resource.api';
import TypographyTitle from '../../common/Title';
import TypographyText from '../../common/Text';
import NotificationComponent, { NotificationHandlerProps } from '../../common/Notification';
import {
  MESSAGES,
  // FORMATS
} from '../../../utils/constant';
import ButtonLayout from '../../../components/ButtonLayout';
import {
  DeleteOutlined,
  EditOutlined,
  HourglassOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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

const resourceTypes = [
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
];

const assignResourceDefaults = {
  resource_type: 'Planned',
  fte: 10,
  start_date: dayjs(new Date()),
};

export default function ProjectResourcesTable({ resourceQuery }: ProjectResourceTableI) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const resetRef = useRef(null);
  const [resources, setResources] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [project, setProject] = useState<any>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAssignResourceModal, setOpenAssignResourceModal] = useState<boolean>(false);
  const [suggestedEngineers, setSuggestedEngineers] = useState<any>();
  const [assignResourceData] = useState<any>({});
  const { RangePicker } = DatePicker;
  const { contextHolder, notificationHandler } = NotificationComponent();
  const [availabilityOptions] = useState<any>(hourAvailability);
  const [projectResourceId, setProjectResourceId] = useState<string>('');
  const [projectCompletionTime, setProjectCompletionTime] = useState<any>();
  const now = new Date();
  const [selectProjectResource, setSelectProjectResource] = useState<any>({});

  function convertMillisecondsToDaysHours(milliseconds: number) {
    const d = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
    const days = d > 1 ? d + ' days' : d + ' day';
    const remainingMilliseconds = milliseconds % (24 * 60 * 60 * 1000);

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
    const milliseconds = Date.parse(projectDetails?.data?.end_date) - now.getTime();

    setProjectCompletionTime(convertMillisecondsToDaysHours(milliseconds));

    const allocationResources = await getProjectResourceAllocation(projectId as string);
    const resourceList = [];
    for (const projectResource of allocationResources.data) {
      const r = {
        key: projectResource?.project_resource_id,
        name: projectResource?.resource_name,
        team: projectResource?.team_name,
        level: projectResource?.level,
        fte: projectResource?.fte,
        joiningDate: projectResource?.start_date,
        type: projectResource?.resource_type,
        status: '',
        resourceId: projectResource?.resource_id,
        projectResourceId: projectResource?.project_resource_id,
        assignedResources: projectResource?.assigned_resources,
        projectPlanId: projectResource?.project_plan_id,
        teamId: projectResource?.team_id,
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
      queryParams += 'level=' + data.level + '&fte=' + data.fte + '&team=' + data.team;
    }
    const suggestedResources = await getSuggestedEngineers(queryParams);
    const engineersList = [];
    for (const engineer of suggestedResources.data) {
      const e = {
        ...engineer,
        selected: false,
        selectedPercentage: '',
        plan_id: data?.projectResourceId,
        total_fte_requirement: data?.fte,
      };
      engineersList.push(e);
    }
    setSuggestedEngineers(engineersList);
    setProjectResourceId(data.projectResourceId);
    setSelectProjectResource(data);
    setOpenModal(true);
  };

  const removeResource = async (data: any) => {
    setLoader(true);
    // const id = data.key;
    let notificationConfig: NotificationHandlerProps = {
      type: 'success',
      message: 'Resources Assignment Removed',
      description: 'Resources have been unallocated from the plan',
    };

    const payload = {
      project_id: project.id,
      project_plan_id: data?.projectPlanId,
      selectedEngineers: [],
    };

    const response: any = await assignProjectResources(payload);

    if (response) {
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
    setOpenModal(false);

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

  // const renderAssignResourceModal = async (data: any) => {
  //   setOpenAssignResourceModal(true);
  //   setAssignResourceData(data);
  //   const hoursOptions: any = [];
  //   hourAvailability.forEach((option) => {
  //     if (parseInt(data.available_fte) >= parseInt(option.value)) {
  //       hoursOptions.push(option);
  //     }
  //   });
  //   setAvailabilityOptions(hoursOptions);
  //   setOpenModal(false);
  // };

  // const getAvailibilityOptions = async (data: any) => {
  //   const hoursOptions: any = [];
  //   hourAvailability.forEach((option) => {
  //     if (parseInt(data.available_fte) >= parseInt(option.value)) {
  //       hoursOptions.push(option);
  //     }
  //   });
  //   return hoursOptions;
  // };

  // const handleOptionChange = (value: any, record: any) => {
  //   const updatedData = suggestedEngineers.map((item: any) => {
  //     if (item.selected && item.resource_id === record.resource_id) {
  //       // Update the 'dropdown' property with the new value
  //       return { ...item, selectedPercentage: value };
  //     }
  //     return item;
  //   });
  //   setSuggestedEngineers(updatedData);
  // };

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

  // const handleOpenProjectResourceCancel = () => {
  //   setOpenAddProjectResourceModal(false);
  // };

  // const getTeamTypes = async () => {
  //   const data: team[] = await getTeams();
  //   setTeams(data);
  // };
  // const getProjectLeadTypes = async () => {
  //   const res: any = await getProjectLeads();
  //   if (res.status == 200) {
  //     setProjectLeads(res.data.data);
  //   }
  // };
  // const getTechnologiesTypes = async () => {
  //   const res: skill[] = await getSkills();
  //   setTechnologies(res);
  // };

  // const handleAddProjectResource = () => {
  //   getTeamTypes();
  //   getTechnologiesTypes();
  //   setOpenAddProjectResourceModal(true);
  // };

  // const onAddProjectResource = async (values: any) => {
  //   setLoader(true);
  //   values.start_date = values.start_date != undefined ? new Date(values.start_date) : null;
  //   values.end_date = values.end_date != undefined ? new Date(values.end_date) : null;
  //   values.expected_start_date =
  //     values.expected_start_date != undefined ? new Date(values.expected_start_date) : null;
  //   values.expected_end_date =
  //     values.expected_end_date != undefined ? new Date(values.expected_end_date) : null;

  //   values.project_id = project?.id;

  //   const response: response = await allocateResource(values);

  //   // const response: response = {
  //   //   statusCode: 200,
  //   //   err: {
  //   //     message: 'Error occured'
  //   //   },
  //   //   data: []
  //   // }
  //   if (response.statusCode == 201) {
  //     notification.open({
  //       message: MESSAGES.RESOURCE_ALLOCATE_SUCCESS,
  //     });
  //     setLoader(false);
  //     fetchResources();
  //     setOpenAddProjectResourceModal(false);
  //   } else {
  //     if (response?.err) {
  //       notification.open({
  //         message: response?.err?.message,
  //       });
  //       setLoader(false);
  //     } else {
  //       setLoader(false);
  //       notification.open({
  //         message: MESSAGES.ERROR,
  //       });
  //     }
  //   }
  // };

  const renderCustomCell = (objects: Array<any>) => {
    if (objects.length > 0) {
      return (
        <List
          size='small'
          dataSource={objects}
          renderItem={(item: any) => (
            <List.Item>
              <Link to={'/resources?name=' + item?.resource_name}>{item?.resource_name} </Link>
              {/* <span
                style={{ cursor: 'pointer', color: '#1d39c4' }}
                onClick={() => navigate('/resources?name=' + item?.resource_name)}
              >{item?.resource_name}{' '}
              </span> */}
              {item?.deployed_percentage ? (
                <Tag style={{ border: 'none' }} color='geekblue'>
                  {item?.deployed_percentage + '%'}
                </Tag>
              ) : (
                ''
              )}
              {item?.resource_type ? (
                <Tag style={{ border: 'none' }} color='geekblue'>
                  {item?.resource_type}
                </Tag>
              ) : (
                ''
              )}
            </List.Item>
          )}
        />
      );
    } else {
      return <div style={{ textAlign: 'center' }}>-</div>;
    }
  };

  const columns: ColumnsType<ProjectResourcesInterface> = [
    {
      title: 'Assigned Resources',
      dataIndex: 'assignedResources',
      render: (element) => renderCustomCell(element),
    },
    // {
    //   title: 'Resource Name',
    //   dataIndex: 'name',
    //   key: 'name',
    //   sorter: (a, b) => columnsSort(a.name, b.name),
    // },
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
      title: 'Planned Availability(%)',
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
        <Space size='large'>
          <a onClick={() => renderManageResource(element)}>
            <EditOutlined />
          </a>

          <a onClick={() => removeResource(element)}>
            <DeleteOutlined style={{ color: 'red' }} />
          </a>
        </Space>
      ),
    },
  ];

  const handleCheckboxChange = async (e: any, record: any) => {
    const engineers = [...suggestedEngineers];
    const updatedData = engineers.map((item) => {
      if (item.resource_id === record.resource_id) {
        return {
          ...item,
          selected: e.target.checked,
          selected_resource_type:
            item.selected_resource_type ?? assignResourceDefaults.resource_type,
          selectedPercentage: item.selectedPercentage ?? assignResourceDefaults.fte,
        };
      }
      return item;
    });
    setSuggestedEngineers(updatedData);
  };

  // const AvailibilityOptions = (text: any, record: any) => {
  //   const hoursOptions: any = [];
  //   hourAvailability.forEach((option) => {
  //     if (parseInt(text) >= parseInt(option.value)) {
  //       if (parseInt(record.total_fte_requirement) >= parseInt(option.value)) {
  //         hoursOptions.push({
  //           label: option.value,
  //           value: option.value,
  //           disabled: !(parseInt(record.total_fte_requirement) - parseInt(option.value) >= 0),
  //         });
  //       }
  //     }
  //   });
  //   return (
  //     <Select
  //       defaultValue={'Select assignment % '}
  //       onChange={(value) => handleOptionChange(value, record)}
  //     >
  //       {hoursOptions.map((option: any) => (
  //         <Select.Option key={option.value} value={option.value} disabled={option.disabled}>
  //           {option.label}
  //         </Select.Option>
  //       ))}
  //     </Select>
  //   );
  // };

  const handleResourceTypeChange = (value: any, record: any) => {
    const updatedData = suggestedEngineers.map((item: any) => {
      if (item.resource_id === record.resource_id) {
        return { ...item, selected_resource_type: value };
      }
      return item;
    });
    setSuggestedEngineers(updatedData);
  };

  const renderResourceType = (record: any) => {
    return (
      <Select
        defaultValue={'Planned'}
        onChange={(value) => handleResourceTypeChange(value, record)}
      >
        {resourceTypes.map((option: any) => (
          <Select.Option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    );
  };

  const handleDateChange = (date: any) => {
    const startDate = new Date(date);
    const updatedData = suggestedEngineers.map((item: any) => {
      if (item.selected) {
        return { ...item, startDate: startDate };
      }
      return item;
    });
    setSuggestedEngineers(updatedData);
  };

  const handleNumericInputChange = (input: any, record: any) => {
    const updatedData = suggestedEngineers.map((item: any) => {
      if (item.resource_id === record.resource_id) {
        return { ...item, selectedPercentage: input };
      }
      return item;
    });
    setSuggestedEngineers(updatedData);
  };

  const suggestedEngineersColumns: ColumnsType<SuggestedEngineerInterface> = [
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
      render: (_, record) => (
        <Checkbox checked={record?.selected} onChange={(e) => handleCheckboxChange(e, record)} />
      ),
    },
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
      title: 'Current Utilization(%)',
      dataIndex: 'total_fte',
      key: 'total_fte',
      sorter: (a, b) => columnsSort(a.total_fte, b.total_fte),
    },
    // {
    //   title: 'Left Availability(%)',
    //   dataIndex: 'available_fte',
    //   key: 'available_fte',
    //   render: (text, record) => AvailibilityOptions(text, record),
    //   // sorter: (a, b) => columnsSort(a.available_fte, b.available_fte),
    // },
    {
      title: 'Required Allocation(%)',
      dataIndex: 'available_fte',
      key: 'available_fte',
      render: (text, record) => (
        <InputNumber
          min={10}
          max={100}
          defaultValue={10}
          onChange={(e) => handleNumericInputChange(e, record)}
        />
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: () => (
        <DatePicker
          defaultValue={dayjs(new Date())}
          onChange={(date, record) => handleDateChange(record)}
        />
      ),
    },
    {
      title: 'Resource Type',
      dataIndex: 'resource_type',
      key: 'resource_type',
      render: (text, record) => renderResourceType(record),
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

  const handleAssignResources = async () => {
    let notificationConfig: NotificationHandlerProps = {
      type: 'success',
      message: 'Resources Assigned',
      description: 'Resources have been assigned',
    };
    const payload = {
      project_id: project.id,
      project_plan_id: selectProjectResource?.projectPlanId,
      resource_type: selectProjectResource?.type,
      team_name: selectProjectResource?.team,
      level: selectProjectResource?.level,
      fte: selectProjectResource?.fte,
      team_id: selectProjectResource?.teamId,
      selectedEngineers: suggestedEngineers.filter((item: any) => item.selected),
    };

    const response: any = await assignProjectResources(payload);

    if (response) {
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
    setOpenModal(false);
  };

  const handleCancelAssignResources = () => {
    setOpenModal(false);
  };

  const cardStyle = {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '100%',
  };

  const iconStyle = {
    color: '#adc6ff',
    marginLeft: '10px',
    fontSize: '21px',
    strokeWidth: '15px',
  };

  return (
    <>
      <div>
        <ButtonLayout
          title={
            <TypographyTitle level={3} style={{ marginTop: '0px', marginBottom: '0px' }}>
              Project Details
            </TypographyTitle>
          }
          left={[]}
          right={[
            {
              children: 'Edit Project',
              props: {
                type: 'primary',
                icon: <PlusOutlined />,
                onClick: () => navigate('/edit-project?id=' + project?.id),
              },
            },
          ]}
        />
        <Row gutter={16}>
          {/* First Card */}
          <Col span={8}>
            <Card
              size='small'
              title={
                <span>
                  {'Info'}
                  <InfoCircleOutlined style={iconStyle} />
                </span>
              }
              style={cardStyle}
            >
              <div style={{ padding: '0px' }}>
                <p>
                  Project Name: <strong>{project?.name}</strong>{' '}
                </p>
                <p>
                  {' '}
                  Client: <strong>{project?.client?.name}</strong>{' '}
                </p>
              </div>
            </Card>
          </Col>

          {/* Second Card */}
          <Col span={8}>
            <Card
              size='small'
              title={
                <span>
                  {'Timeline'}
                  <ScheduleOutlined style={iconStyle} />
                </span>
              }
              style={cardStyle}
            >
              <p>
                Start Date: <strong>{project?.start_date}</strong>{' '}
              </p>
              <p>
                End Date: <strong>{project?.end_date}</strong>{' '}
              </p>
            </Card>
          </Col>

          {/* Third Card */}
          <Col span={8}>
            <Card
              size='small'
              title={
                <span>
                  {'Time Remaining'}
                  <HourglassOutlined style={iconStyle} />
                </span>
              }
              style={cardStyle}
            >
              <TypographyText>
                <strong>{projectCompletionTime}</strong>
              </TypographyText>
            </Card>
          </Col>
        </Row>
      </div>
      <ButtonLayout
        title={
          <TypographyTitle level={3} style={{ marginTop: '30px', marginBottom: '0px' }}>
            Manage Resources
          </TypographyTitle>
        }
        left={[]}
        right={[]}
      />
      <>
        <Modal
          title='Manage Resources'
          centered
          visible={openModal}
          onOk={handleAssignResources}
          onCancel={handleCancelAssignResources}
          width={1400}
          okText={'Assign Resource(s)'}
          destroyOnClose={true}
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
                      value: 'Scoped',
                      label: 'Scoped',
                    },
                    {
                      value: 'Recurring',
                      label: 'Recurring',
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
