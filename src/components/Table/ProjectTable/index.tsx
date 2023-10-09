// import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  // List,
  Space,
  Table,
  notification,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Fragment, useState, useEffect } from 'react';

// import { getSkills } from '../../../apis';
import { ProjectTableI } from './interfaces/ProjectTableInterface';
import { projectListDataType } from './interfaces/projectListInterface';
import { MESSAGES } from '../../../utils/constant';
import { getAllProjectsQuery } from '../../../apis/projects.api';
import { useLogout } from '../../../hooks/useLogout';

export default function ProjectTable({ projectQuery }: ProjectTableI) {
  const [projects, setProjects] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  // const [skills, setSkills] = useState([]);
  const [count, setCount] = useState(0);
  const [queryBag, setQueryBag] = useState({});
  const { logout } = useLogout();
  const paginationConfig = {
    current: 1,
    page: 1,
    pageSize: 10,
    total: count,
  };
  const [pagination, setPagination] = useState(paginationConfig);

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
      if (response?.statusCode == 401) {
        logout();
      } else {
        setCount(response.data.count);
        if (response?.statusCode == 200) {
          setProjects(response?.data?.rows);
        } else {
          notification.open({
            message: MESSAGES.ERROR,
          });
        }
      }
    } catch (err) {
      setLoader(false);
    }
    setLoader(false);
  };
  const columns: ColumnsType<projectListDataType> = [
    {
      title: 'Project Name',
      render: (element) => {
        return renderProjectDetails(element, element?.name);
      },
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
          {`${record.projectResources.length} / ${record.projectPlannedResources.length}`}
        </span>
      ),
    },
    {
      title: 'Project Type',
      dataIndex: 'project_type',
      key: 'type',
      filters: [
        {
          text: 'Scoped',
          value: 'Scoped',
        },
        {
          text: 'Recurring',
          value: 'Recurring',
        },
      ],
      filterSearch: true,
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'startdate',
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'enddate',
    },
  ];

  const renderProjectDetails = (element: any, action: string) => {
    return (
      <Space size='middle'>
        <Link to={'/assign-resource?id=' + element.id}>{action}</Link>
      </Space>
    );
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
    fetchProjects();
  }, [queryBag]);

  // useEffect(() => {
  //   login();
  // }, []);

  return (
    <Table
      columns={columns}
      dataSource={projects}
      loading={loader}
      scroll={{ x: 'max-content' }}
      bordered
      onChange={(pagination: any, filter: unknown, sorter: unknown) => {
        setQueryBag((prev) => ({ ...prev, pagination, filter, sorter }));
        setPagination(pagination);
      }}
      pagination={{ ...pagination, total: count }}
    />
  );
}
