import { List, Tag, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react';

import { ResourceTableI } from './interfaces/ResourceTableInterface';
import { resourceListDataType } from './interfaces/resourceListInterface';
import { getAllResources } from '../../../apis/resources.api';
import { getSkills } from '../../../apis/skills.api';
import { getProjectList } from '../../../apis/projects.api';
import { Tags } from './interfaces/Tags.interface';
import {
  ASSIGNED_LEVELS,
  EMPLOYMENT_STATUS,
  EMPLOYMENT_UTILIZATION,
} from '../../../utils/constant';

const styles = {
  projectContainer: { display: 'flex', justifyContent: 'center' } as React.CSSProperties,
  skillContainer: { width: 'auto', display: 'flex', flexWrap: 'wrap' } as React.CSSProperties,
  tagContainer: { minWidth: '70px' } as React.CSSProperties,
};

export default function ResourceTable({
  resourceQuery,
  handleResourceDetail,
}: // handleAssignProject,
ResourceTableI) {
  const [resources, setResources] = useState<object>([]);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [queryBag, setQueryBag] = useState({});
  const paginationConfig = {
    current: 1,
    page: 1,
    pageSize: 10,
    total: count,
  };

  const [pagination, setPagination] = useState(paginationConfig);

  const prepareQueryBag = (query: any) => {
    let queryParams = `?name=${query?.name || ''}`;
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
    if (query?.pagination?.current) {
      queryParams += `&page=${query?.pagination?.current}`;
    }
    if (query?.pagination?.pageSize) {
      queryParams += `&pageSize=${query?.pagination?.pageSize}`;
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
    fetchResources();
  }, []);

  useEffect(() => {
    setQueryBag((prev) => ({ ...prev, name: resourceQuery?.query }));
  }, [resourceQuery]);

  useEffect(() => {
    fetchResources();
  }, [queryBag]);

  const renderProjectCell = (array: Array<unknown>) => {
    if (!(array?.length > 0)) {
      return <div>-</div>;
    }
    const projectNames = array.map((element: any) => element?.value || '');
    if (projectNames[0] === '') return <div style={styles.projectContainer}>-</div>;
    return (
      <List
        size='small'
        dataSource={projectNames}
        renderItem={(item, index) => (
          <List.Item style={styles.projectContainer} key={index}>
            {item as React.ReactNode}
          </List.Item>
        )}
      />
    );
  };

  const renderSkillsList = (skills: Array<Tags>) => {
    const skillsName = skills?.map((skill) => skill?.value);
    return <div style={styles.skillContainer}>{skillsName?.join(',')}</div>;
  };

  const renderTeamsColumn = (teams: any) => {
    return <div>{(teams?.team_name as string).toUpperCase()}</div>;
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

  const columns: ColumnsType<resourceListDataType> = [
    {
      title: 'Name',
      render: (element) => <a onClick={() => handleResourceDetail(element)}>{element?.name}</a>,
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
          ? projects?.map((element: any) => ({ text: element?.name, value: element?.id }))
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

  return (
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
  );
}