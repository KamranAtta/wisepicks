/* eslint-disable no-console */
import moment from 'moment';
import { Link } from 'react-router-dom';
import { List, Space, Table, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Fragment, useState, useEffect } from 'react';

import { getSkills } from '../../../apis';
import { ProjectTableI } from './interfaces/ProjectTableInterface';
import { projectListDataType } from './interfaces/projectListInterface';
import { MESSAGES } from '../../../utils/constant';
import { getAllProjectsQuery } from '../../../apis/projects.api';

export default function ProjectTable({ projectQuery, handleProjectDetail }: ProjectTableI) {
  const [projects, setProjects] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  const [skills, setSkills] = useState([]);
  const [queryBag, setQueryBag] = useState({});

  const prepareQueryBag = (query: any) => {
    let queryParams = `?name=${query?.name || ''}`;
    queryParams += `&page=${query?.pagination?.current || 1}`;
    queryParams += `&pageSize=${query?.pagination?.pageSize || 10}`;
    if (query?.filter?.domain?.length > 0) {
      query?.filter?.domain?.forEach((domainId: string) => {
        queryParams += `&domain[]=${domainId}`;
      });
    }
    if (query?.filter?.type?.length > 0) {
      query?.filter?.type?.forEach((type: string) => {
        queryParams += `&type[]=${type}`;
      });
    }
    return queryParams;
  };

  const fetchProjects = async () => {
    setLoader(true);
    try {
      const queryParams = prepareQueryBag(queryBag);
      const response = await getAllProjectsQuery(queryParams);
      if (response?.statusCode == 200) {
        setProjects(response?.data?.rows);
      } else {
        notification.open({
          message: MESSAGES.ERROR,
        });
      }
    } catch (err) {
      setLoader(false);
    }
    setLoader(false);
  };

  const preFetchingFilter = async () => {
    const skillList = await getSkills();
    setSkills(skillList);
  };

  const columns: ColumnsType<projectListDataType> = [
    {
      title: 'Project Name',
      render: (element) => <a onClick={() => handleProjectDetail(element)}>{element?.name}</a>,
    },
    {
      title: 'Client Name',
      render: (element) => <>{element.client.name}</>,
      key: 'client',
    },
    {
      title: (
        <>
          <span>Resources</span>
          <br />
          <span>{'(Allocated / Planned)'}</span>
        </>
      ),
      dataIndex: 'resources',
      key: 'resources',
      render: (_, record) => (
        <span>
          {countAllocatedResources(record.projectResources) +
            ' / ' +
            record.projectResources.length}
        </span>
      ),
    },
    // {
    //   title: (
    //     <>
    //       <span>{'Hours'}</span>
    //       <br />
    //       <span>{'(Allocated / Planned)'}</span>
    //     </>
    //   ),
    //   dataIndex: 'hours',
    //   key: 'hours',
    //   render: (text, record) => <span>{record.allocatedHours + ' / ' + record.plannedHours}</span>,
    // },
    {
      title: 'Project Type',
      dataIndex: 'project_type',
      key: 'type',
      filters: [
        {
          text: 'Billable',
          value: 'Billable',
        },
        {
          text: 'Non-Billable',
          value: 'Non-Billable',
        },
      ],
      filterSearch: true,
    },
    // {
    //   title: 'Status',
    //   render: (element) => (
    //     <Tag color={element?.status === 'Normal' ? 'green' : 'red'}>
    //       {element?.status.toUpperCase()}
    //     </Tag>
    //   ),
    //   filters: [
    //     {
    //       text: 'Normal',
    //       value: 'Normal',
    //     },
    //     {
    //       text: 'Under Allocated',
    //       value: 'Under Allocated',
    //     },
    //     {
    //       text: 'Over Allocated',
    //       value: 'Over Allocated',
    //     },
    //   ],
    //   filterMode: 'tree',
    //   filterSearch: true,
    //   onFilter: (value, record) => {
    //     return record.status.startsWith(value as string);
    //   },
    //   sorter: (a, b) => columnsSort(a.status, b.status),
    // },
    {
      title: 'Technologies',
      dataIndex: 'domain',
      key: 'domain',
      filters:
        skills?.length > 0
          ? skills?.map((element: any) => ({ text: element?.name, value: element?.id }))
          : [],
      filterSearch: true,
      render: (element) => {
        return renderCustomCell(element?.map((element: any) => element?.value));
      },
    },
    {
      title: 'Expected Start Date',
      dataIndex: 'start_date',
      key: 'startdate',
    },
    {
      title: 'Expected End Date',
      dataIndex: 'end_date',
      key: 'enddate',
    },
    {
      title: 'Start Date',
      dataIndex: 'expected_start_date',
      key: 'expectedstartdate',
    },
    {
      title: 'End Date',
      dataIndex: 'expected_end_date',
      key: 'expectedenddate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (element) => {
        const endDate = moment(element.endDate);
        const currentDate = moment();
        if (element.active == null) {
          return currentDate.isAfter(endDate) == false ? (
            <Space size='middle'>
              <Link to={'/assign-resource?id=' + element.id}>Assign Resource</Link>
            </Space>
          ) : (
            <Space size='middle'>
              <Link
                to='/assign-resource'
                style={{ pointerEvents: 'none', cursor: 'default', color: '#aaa' }}
              >
                Assign Resource
              </Link>
            </Space>
          );
        } else {
          return element.active == true ? (
            <Space size='middle'>
              <Link to={'/assign-resource?id=' + element.id}>Assign Resource</Link>
            </Space>
          ) : (
            <Space size='middle'>
              <Link
                to='/assign-resource'
                style={{ pointerEvents: 'none', cursor: 'default', color: '#aaa' }}
              >
                Assign Resource
              </Link>
            </Space>
          );
        }
      },
    },
  ];
  const renderCustomCell = (object: Array<string>) => {
    return (
      <List size='small' dataSource={object} renderItem={(item) => <List.Item>{item}</List.Item>} />
    );
  };

  const countAllocatedResources = (object: object[]) => {
    let count = 0;
    object.forEach((element: any) => {
      if (element.resource_id != null) {
        count++;
      }
    });
    return count;
  };

  useEffect(() => {
    setQueryBag((prev) => ({
      ...prev,
      name: projectQuery?.query?.searchQuery,
      page: projectQuery?.query?.page,
      pageSize: projectQuery?.query?.pageSize,
    }));
  }, [projectQuery]);

  useEffect(() => {
    preFetchingFilter();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [queryBag]);

  return (
    <Table
      columns={columns}
      dataSource={projects}
      loading={loader}
      scroll={{ x: 'max-content' }}
      bordered
      onChange={(pagination: unknown, filter: unknown, sorter: unknown) => {
        setQueryBag((prev) => ({ ...prev, pagination, filter, sorter }));
      }}
    />
  );
}
