/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { List, Space, Tag, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react';

import { ResourceTableI } from './interfaces/ResourceTableInterface';
import { resourceListDataType } from './interfaces/resourceListInterface';
import { getAllResources } from '../../../apis/resources.api';
import { getSkills } from '../../../apis/skills.api';
import { getProjectList } from '../../../apis/projects.api';

interface Tags {
  id: string;
  value: string;
}

export default function ResourceTable({
  resourceQuery,
  handleResourceDetail,
  handleAssignProject,
}: ResourceTableI) {
  const [resources, setResources] = useState<object>([]);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [queryBag, setQueryBag] = useState({});

  const prepareQueryBag = (query: any) => {
    console.log(query);
    let queryParams = `?name=${query?.name}`;
    if (query?.filter?.assignedProjects?.length > 0) {
      query?.filter?.assignedProjects?.forEach((projectId: string) => {
        queryParams += `&projects[]=${projectId}`;
      });
    }
    if (query?.filter?.skill_ids?.length > 0) {
      query?.filter?.skill_ids?.forEach((skillId: string) => {
        queryParams += `&skills[]=${skillId}`;
      });
    }
    return queryParams;
  };

  const fetchResources = async () => {
    setLoader(true);
    const queryParams = prepareQueryBag(queryBag);
    const resourceList = await getAllResources(queryParams);

    setResources(resourceList?.rows);
    setCount(resourceList?.count);
    setLoader(false);
    return count;
  };

  const preFetchingFilter = async () => {
    const skillList = await getSkills();
    const projectList = await getProjectList();
    setProjects(projectList);
    setSkills(skillList);
  };

  useEffect(() => {
    preFetchingFilter();
  }, []);

  useEffect(() => {
    // fetchResources();
    setQueryBag((prev) => ({ ...prev, name: resourceQuery?.query }));
  }, [resourceQuery]);

  useEffect(() => {
    fetchResources();
  }, [queryBag]);

  const renderCustomCell = (array: Array<unknown>) => {
    if (!(array?.length > 0)) {
      return <div></div>;
    }
    const projectNames = array.map((element: any) => element?.project?.name || '');
    return (
      <List
        size='small'
        dataSource={projectNames}
        renderItem={(item) => <List.Item>{item as React.ReactNode}</List.Item>}
      />
    );
  };

  const renderSkillsList = (skills: Array<Tags>) => {
    const skillsName = skills?.map((skill) => skill?.value);
    return (
      <div style={{ width: 'auto', display: 'flex', flexWrap: 'wrap' }}>
        {skillsName?.join(',')}
      </div>
    );
  };

  const renderTeamsColumn = (teams: any) => {
    return <div>{(teams?.name as string).toUpperCase()}</div>;
  };

  const columns: ColumnsType<resourceListDataType> = [
    {
      title: 'Name',
      render: (element) => <a onClick={() => handleResourceDetail(element)}>{element?.name}</a>,
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      render: (element, row) => renderTeamsColumn(row?.team),
    },
    {
      title: 'Availability In Hours',
      dataIndex: 'daily_hours_availability',
      key: 'daily_hours_availability',
    },
    {
      title: 'Level',
      dataIndex: 'assigned_level',
      key: 'assigned_level',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status !== 'Normal' ? 'green' : 'red'}>
          {status ? status.toUpperCase() : 'Normal'}
          {/* Supported haven't implemented */}
        </Tag>
      ),
    },
    {
      title: 'Employment Status',
      dataIndex: 'employment_status',
      key: 'employment_status',
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
      dataIndex: 'assignedProjects',
      key: 'assignedProjects',
      filters:
        projects?.length > 0
          ? projects?.map((element: any) => ({ text: element?.name, value: element?.id }))
          : [],
      filterSearch: true,
      filterMultiple: true,
      render: (element, row) => {
        return renderCustomCell(row?.projectResource);
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (element) => (
        <Space size='middle'>
          <a onClick={() => handleAssignProject(element)}>Assign Project</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      onChange={(pagination: unknown, filter: unknown, sorter: unknown) => {
        setQueryBag((prev) => ({ ...prev, pagination, filter, sorter }));
      }}
      columns={columns}
      dataSource={resources as any}
      loading={loader}
      scroll={{ x: 'max-content' }}
      bordered
    />
  );
}
