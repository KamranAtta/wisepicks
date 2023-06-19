/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import moment from 'moment';
import { Link } from 'react-router-dom';
import { List, Space, Tag, Table, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Fragment, useState, useEffect } from 'react';

import { columnsSort } from '../utils';
import { getAllProjects } from '../../../apis';
import { ProjectTableI } from './interfaces/ProjectTableInterface';
import { projectListDataType } from './interfaces/projectListInterface';
import { MESSAGES } from '../../../utils/constant';

export default function ProjectTable({ projectQuery, handleProjectDetail }: ProjectTableI) {
  const [projects, setProjects] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);

  const fetchProjects = async () => {
    setLoader(true);
    const response = await getAllProjects(projectQuery.query);
    if (response?.statusCode == 200) {
      setProjects(response?.data?.rows);
    } else {
      notification.open({
        message: MESSAGES.ERROR,
      });
    }
    setLoader(false);
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
      onFilter: (value, record) => {
        return record.type.startsWith(value as string);
      },
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
      filters: [
        {
          text: 'Javascript',
          value: 'Javascript',
        },
        {
          text: 'Python',
          value: 'Python',
        },
        {
          text: 'Java',
          value: 'Java',
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => {
        return record.technologies.includes(value as string);
      },
      render: (element) => renderCustomCell(element),
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
    fetchProjects();
  }, [projectQuery]);

  return (
    <Table
      columns={columns}
      dataSource={projects}
      loading={loader}
      scroll={{ x: 'max-content' }}
      bordered
    />
  );
}
