/* eslint-disable camelcase */
import {
  List,
  Tag,
  Table,
  Modal,
  Form,
  Select,
  DatePicker,
  notification,
  Space,
  Row,
  Col,
  Button,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect, useRef } from 'react';

import { ResourceTableI } from './interfaces/ResourceTableInterface';
import { resourceListDataType } from './interfaces/resourceListInterface';
import { getAllResources } from '../../../apis/resources.api';
import { getSkills } from '../../../apis/skills.api';
import {
  getResourceVacations,
  createVacation,
  removeResourceVacation,
} from '../../../apis/vacations.api';
import { getProjectList } from '../../../apis/projects.api';
import NotificationComponent, { NotificationHandlerProps } from '../../common/Notification';
// import { Tags } from './interfaces/Tags.interface';
import {
  ASSIGNED_LEVELS,
  EMPLOYMENT_STATUS,
  EMPLOYMENT_UTILIZATION,
  FORMATS,
  MESSAGES,
} from '../../../utils/constant';
import { Link, useLocation } from 'react-router-dom';
import ButtonLayout from '../../ButtonLayout';
import TypographyTitle from '../../common/Title';
import { columnsSort } from '../utils';
import dayjs from 'dayjs';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Loader from '../../common/Loader';
import { useLogout } from '../../../hooks/useLogout';

const styles = {
  projectContainer: { display: 'flex', justifyContent: 'center' } as React.CSSProperties,
  skillContainer: { width: 'auto', display: 'flex', flexWrap: 'wrap' } as React.CSSProperties,
  tagContainer: { minWidth: '70px' } as React.CSSProperties,
  datePicker: { width: '100%' } as React.CSSProperties,
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
};

interface response {
  statusCode: number;
  err: any;
  data: [];
}

export default function ResourceTable({
  resourceQuery,
}: // handleResourceDetail,
// handleAssignProject,
ResourceTableI) {
  const [form] = Form.useForm();
  const location = useLocation();
  const resetRef = useRef(null);
  const [resources, setResources] = useState<object>([]);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [queryBag, setQueryBag] = useState({});
  const [openVacationModal, setOpenVacationModal] = useState(false);
  const { contextHolder, notificationHandler } = NotificationComponent();
  const [addVacationModal, setAddVacationModal] = useState<any>(false);
  const [selectedResource, setSelectedResource] = useState<any>({});
  const { logout } = useLogout();

  const paginationConfig = {
    current: 1,
    page: 1,
    pageSize: 10,
    total: count,
  };
  const searchConfig = {
    pageNo: 1,
    pageSize: 999,
  };
  const [pagination, setPagination] = useState(paginationConfig);
  const nameParam = new URLSearchParams(location.search);
  const resourceName = nameParam.get('name');

  const prepareQueryBag = (query: any) => {
    let queryParams = `?name=${query?.name || resourceName || ''}`;
    if (query?.filter?.projects?.length > 0) {
      query?.filter?.projects?.forEach((projectId: string) => {
        queryParams += `&projects[]=${projectId}`;
      });
    }
    if (query?.filter?.skill_ids?.length > 0) {
      query?.filter?.skill_ids?.forEach((skillId: string) => {
        queryParams += `&skills[]=${skillId}`;
      });
    }
    if (query?.filter?.utilization) {
      query?.filter?.utilization?.forEach((utilization: string) => {
        queryParams += `&utilization[]=${utilization}`;
      });
    }
    if (query?.filter?.employment_status) {
      query?.filter?.employment_status?.forEach((employmentStatus: string) => {
        queryParams += `&empStatus=${employmentStatus}`;
      });
    }
    if (query?.filter?.assigned_level) {
      query?.filter?.assigned_level?.forEach((level: string) => {
        queryParams += `&assignedLevel[]=${level}`;
      });
    }
    if (query?.name) {
      queryParams += `&page=${searchConfig?.pageNo}`;
      queryParams += `&pageSize=${searchConfig?.pageSize}`;
    } else {
      if (query?.pagination?.current) {
        queryParams += `&page=${query?.pagination?.current}`;
      }
      if (query?.pagination?.pageSize) {
        queryParams += `&pageSize=${query?.pagination?.pageSize}`;
      }
    }

    return queryParams;
  };

  const fetchResources = async () => {
    setLoader(true);
    const queryParams = prepareQueryBag(queryBag);
    const response = await getAllResources(queryParams);
    if (response?.statusCode == 401) {
      logout();
    } else {
      setResources(response?.rows);
      setCount(response?.count);
      setLoader(false);
      return count;
    }
  };

  const preFetchingFilter = async () => {
    const skillList = await getSkills();
    const projectList = await getProjectList();
    setProjects(projectList);
    setSkills(skillList);
  };

  useEffect(() => {
    preFetchingFilter();
    fetchResources();
  }, []);

  useEffect(() => {
    setQueryBag((prev) => ({ ...prev, name: resourceQuery?.query }));
  }, [resourceQuery]);

  useEffect(() => {
    fetchResources();
  }, [queryBag, resourceName]);

  const renderProjectCell = (array: Array<unknown>) => {
    if (!(array?.length > 0)) {
      return <div>-</div>;
    }
    const projectNames = array.map((element: any) => {
      return {
        key: element?.id || '',
        value: element?.value || '',
        percentage: element?.percentage || '',
      };
    });
    return (
      <List
        size='small'
        dataSource={projectNames}
        renderItem={(item, index) => (
          <List.Item style={styles.projectContainer} key={index}>
            <Link to={'/assign-resource?id=' + item?.key}>{item.value as React.ReactNode}</Link>
            <Tag style={{ border: 'none' }} color='geekblue'>
              {item?.percentage ? item?.percentage + '%' : ''}
            </Tag>
          </List.Item>
        )}
      />
    );
  };

  const renderSkillsList = (skillIds: any) => {
    const skls = skills.filter((obj: any) => skillIds.includes(obj?.id));
    const skillsName = skls?.map((skill: any) => skill?.name);
    return (
      <div style={styles.skillContainer}>
        {skillsName.map((name, index) => (
          <Tag key={index} style={{ border: 'none' }} color='geekblue'>
            {name}
          </Tag>
        ))}
      </div>
    );
    return <div style={styles.skillContainer}>{skillsName?.join(',')}</div>;
  };

  const renderTeamsColumn = (teams: any) => {
    return <div>{(teams?.team_name as string).toUpperCase()}</div>;
  };

  const renderAvailableHoursColumn = (row: any) => {
    const utilPercent = row?.utilization ? Number(row?.utilization) : 0;
    const hoursPercent = 100 - utilPercent;
    const totalAvailibility = Math.ceil((hoursPercent / 100) * 8);
    return <div>{totalAvailibility}</div>;
  };

  const renderUtilization = (utilizationETE: any) => {
    let meta: { color: string; text: string } = { color: 'orange', text: 'UNDER UTILIZED' };

    if (utilizationETE > 100) {
      meta = { color: 'red', text: 'OVER UTILIZED' };
    } else if (utilizationETE >= 50 && utilizationETE <= 100) {
      meta = { color: 'green', text: 'NORMAL' };
    }

    return (
      <>
        <Tag color={meta?.color} style={styles.tagContainer}>
          {meta?.text?.toUpperCase()} ({utilizationETE || 0}%)
        </Tag>
      </>
    );
  };

  const handleResource = async (row: any) => {
    const resourceId = row.id;
    const resVacations = await getResourceVacations(resourceId);
    if (resVacations?.statusCode == 401) {
      logout();
    } else {
      const vList = resVacations.data?.map((element: any) => ({
        vacation_type: element?.vacation_type,
        start_date: dayjs(element?.start_date).format(FORMATS.DATE_FORMAT),
        end_date: dayjs(element?.end_date).format(FORMATS.DATE_FORMAT),
        resourceId: resourceId,
        id: element?.id,
        resourceName: row?.name,
      }));
      setSelectedResource({ ...row, vacations: vList });
      setOpenVacationModal(true);
    }
  };

  const columns: ColumnsType<resourceListDataType> = [
    {
      title: 'Name',
      render: (element) => <a onClick={() => handleResource(element)}>{element?.name}</a>,
    },
    {
      title: 'Team',
      dataIndex: 'team_name',
      key: 'team',
      render: (element, row) => renderTeamsColumn(row),
    },
    {
      title: 'Availability In Hours',
      dataIndex: 'daily_hours_availability',
      key: 'daily_hours_availability',
      render: (element, row) => renderAvailableHoursColumn(row),
    },
    {
      title: 'Level',
      dataIndex: 'assigned_level',
      key: 'assigned_level',
      filterSearch: true,
      filterMultiple: true,
      filters: ASSIGNED_LEVELS?.map((element) => ({ text: element, value: element })),
    },
    {
      title: 'Status',
      key: 'utilization',
      dataIndex: 'utilization',
      filterSearch: true,
      filterMultiple: true,
      filters: EMPLOYMENT_UTILIZATION?.map((element) => ({
        text: element,
        value: element,
      })),
      render: (status) => renderUtilization(status),
    },
    {
      title: 'Employment Status',
      dataIndex: 'employment_status',
      key: 'employment_status',
      filterSearch: true,
      filterMultiple: false,
      filters: EMPLOYMENT_STATUS?.map((element) => ({ text: element, value: element })),
    },
    {
      title: 'Skills',
      dataIndex: 'skill_ids',
      key: 'skill_ids',
      filters:
        skills?.length > 0
          ? skills?.map((element: any) => ({ text: element?.name, value: element?.id }))
          : [],
      filterSearch: true,
      filterMultiple: true,
      render: (element) => {
        return renderSkillsList(element);
      },
    },
    {
      title: 'Assigned Projects',
      dataIndex: 'projects',
      key: 'projects',
      filters:
        projects?.length > 0
          ? projects?.map((element: any) => ({
              text: element?.name,
              value: element?.id,
              percentage: element?.percentage,
            }))
          : [],
      filterSearch: true,
      filterMultiple: true,
      render: (element) => {
        return renderProjectCell(element);
      },
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (element) => (
    //     <Space size='middle'>
    //       <a onClick={() => handleAssignProject(element)}>Assign Project</a>
    //     </Space>
    //   ),
    // },
  ];

  const removeVacation = async (data: any) => {
    setLoader(true);
    // const id = data.key;
    let notificationConfig: NotificationHandlerProps = {
      type: 'success',
      message: 'Vacation Removed',
      description: 'Vacation has been removed successfully!',
    };

    const resourceId = data.resourceId;
    const vacationId = data.id;

    const response: any = await removeResourceVacation(vacationId);
    if (response?.statusCode == 401) {
      logout();
    } else {
      if (response) {
        (resetRef?.current as any)?.click();
        // setOpenVacationModal(false);
        await handleResource({ id: resourceId, name: data.resourceName });
        // setOpenAssignResourceModal(false);
      } else {
        notificationConfig = {
          type: 'error',
          message: 'Error Occured',
          description: 'Error in Vacation Remove',
        };
      }
      setLoader(false);
      notificationHandler(notificationConfig);

      setLoader(false);
    }
  };

  const vacationsColumns: ColumnsType<any> = [
    {
      title: 'Vacation Type',
      dataIndex: 'vacation_type',
      key: 'vacation_type',
      sorter: (a, b) => columnsSort(a.vacation_type, b.vacation_type),
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: (a, b) => columnsSort(a.startDate, b.startDate),
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_ate',
      sorter: (a, b) => columnsSort(a.endDate, b.endDate),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (element) => (
        <Space size='small'>
          <a onClick={() => removeVacation(element)}>
            <DeleteOutlined style={{ color: 'red' }} />
          </a>
        </Space>
      ),
    },
  ];

  const handleCancel = () => {
    setOpenVacationModal(false);
    setAddVacationModal(false);
  };

  const handleAddVacation = () => {
    setAddVacationModal(true);
    setOpenVacationModal(false);
  };

  const onFinish = async (values: any) => {
    setLoader(true);
    values.start_date =
      values.start_date != undefined ? values.start_date.format(FORMATS.DATE_FORMAT) : null;
    values.end_date =
      values.end_date != undefined ? values.end_date.format(FORMATS.DATE_FORMAT) : null;

    const payload = { ...values, resource_id: selectedResource?.id };

    const response: response = await createVacation(payload);
    if (response?.statusCode == 401) {
      logout();
    } else {
      if (response.statusCode == 200) {
        notification.open({
          message: MESSAGES.VACATION_ADD_SUCCESS,
        });
        setLoader(false);
        setAddVacationModal(false);
        handleResource(selectedResource);
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
    }
  };

  return (
    <>
      <Table
        onChange={(pagination: any, filter: unknown, sorter: unknown) => {
          setQueryBag((prev) => ({ ...prev, pagination, filter, sorter }));
          setPagination(pagination);
        }}
        pagination={{ ...pagination, total: count }}
        columns={columns}
        dataSource={resources as any}
        loading={loader}
        scroll={{ x: 'max-content' }}
        bordered
      />
      <Modal
        centered
        visible={openVacationModal}
        width={1000}
        onCancel={handleCancel}
        footer={null}
      >
        {contextHolder}
        <div style={{ marginTop: '30px' }}>
          <ButtonLayout
            title={
              <TypographyTitle level={3}>
                Upcoming Vacations for {selectedResource.name}
              </TypographyTitle>
            }
            left={[]}
            // right={[]}
            right={[
              {
                children: 'Add Vacation',
                props: {
                  type: 'primary',
                  icon: <PlusOutlined />,
                  onClick: () => handleAddVacation(),
                },
              },
            ]}
          />
        </div>
        <Table
          // onChange={(pagination: any, filter: unknown, sorter: unknown) => {
          //   setQueryBag((prev) => ({ ...prev, pagination, filter, sorter }));
          //   setPagination(pagination);
          // }}
          // pagination={{ ...pagination, total: count }}
          pagination={false}
          columns={vacationsColumns}
          dataSource={selectedResource.vacations as any}
          loading={loader}
          scroll={{ x: 'max-content' }}
          bordered
        />
      </Modal>

      <Modal centered visible={addVacationModal} width={600} onCancel={handleCancel} footer={null}>
        {contextHolder}
        <TypographyTitle style={{ textAlign: 'center', marginBottom: '10px' }} level={3}>
          Select Dates
        </TypographyTitle>
        <Form
          name='addVacation'
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          autoComplete='off'
          onFinish={onFinish}
        >
          <Form.Item
            label='Vacation Type'
            name='vacation_type'
            rules={[{ required: true, message: 'Please select vacation type!' }]}
          >
            <Select
              placeholder='Select vacation type'
              options={[
                {
                  value: 'Sick Leave',
                  label: 'Sick Leave',
                },
                {
                  value: 'Annnual',
                  label: 'Annual',
                },
                {
                  value: 'Half Day',
                  label: 'Half Day',
                },
              ]}
            />
          </Form.Item>

          <Form.Item name='start_date' label='Start Date:' rules={[{ type: 'object' as const }]}>
            <DatePicker style={styles.datePicker} />
          </Form.Item>

          <Form.Item name='end_date' label='End Date:' rules={[{ type: 'object' as const }]}>
            <DatePicker style={styles.datePicker} />
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
                    Add Vacation
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Space>
        </Form>
        {loader ? <Loader /> : <></>}
      </Modal>
    </>
  );
}
