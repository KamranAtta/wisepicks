/* eslint-disable @typescript-eslint/no-unused-vars */
import { List, Space, Tag, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Fragment, useState, useEffect } from 'react';

import { columnsSort } from '../utils';

import { getAllProjects, getResources } from '../../../apis';
import { projectListDataType } from './interfaces/projectListInterface';
import { resourceListDataType } from '../ResourceTable/interfaces/resourceListInterface';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function ProjectTable({ resourceQuery }: any) {
  const [input, setInput] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [singleProjectData, setSingleProjectData] = useState<projectListDataType | null>(null);

  const fetchProjects = async () => {
    setLoader(true);
    const projectList = await getAllProjects(resourceQuery.query);
    // const resourceList = await getResources(resourceQuery.query);
    setProjects(projectList);
    setLoader(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [resourceQuery]);

  const renderCustomCell = (object: Array<string>) => {
    return (
      <List size='small' dataSource={object} renderItem={(item) => <List.Item>{item}</List.Item>} />
    );
  };

  const showDrawer = (element: projectListDataType) => {
    setSingleProjectData(element);
    setOpen(true);
  };

  const columns: ColumnsType<projectListDataType> = [
    {
      title: 'Project Name',
      render: (element) => <a onClick={() => showDrawer(element)}>{element?.name}</a>,
      sorter: (a, b) => columnsSort(a.name, b.name),
    },
    {
      title: 'Client Name',
      dataIndex: 'client',
      key: 'client',
      sorter: (a, b) => columnsSort(a.client, b.client),
    },
    {
      title: (
        <>
          <span>{'Resources'}</span>
          <br />
          <span>{'(Allocated / Planned)'}</span>
        </>
      ),
      dataIndex: 'resources',
      key: 'resources',
      render: (text, record) => (
        <span>{record.allocatedResources + ' / ' + record.plannedResources}</span>
      ),
    },
    {
      title: (
        <>
          <span>{'Hours'}</span>
          <br />
          <span>{'(Allocated / Planned)'}</span>
        </>
      ),
      dataIndex: 'hours',
      key: 'hours',
      render: (text, record) => <span>{record.allocatedHours + ' / ' + record.plannedHours}</span>,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startdate',
      sorter: (a, b) => columnsSort(a.startDate, b.startDate),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'enddate',
      sorter: (a, b) => columnsSort(a.endDate, b.endDate),
    },
    {
      title: 'Project Type',
      dataIndex: 'type',
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
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record) => {
        return record.type.startsWith(value);
      },
      sorter: (a, b) => columnsSort(a.type, b.type),
    },
    {
      title: 'Status',
      render: (element) => (
        <Tag color={element?.status === 'Normal' ? 'green' : 'red'}>
          {element?.status.toUpperCase()}
        </Tag>
      ),
      filters: [
        {
          text: 'Normal',
          value: 'Normal',
        },
        {
          text: 'Under Allocated',
          value: 'Under Allocated',
        },
        {
          text: 'Over Allocated',
          value: 'Over Allocated',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record) => {
        return record.status.startsWith(value);
      },
      sorter: (a, b) => columnsSort(a.status, b.status),
    },
    {
      title: 'Technologies',
      dataIndex: 'technologies',
      key: 'technologies',
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
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record) => {
        return record.technologies.includes(value);
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
              <Link to={'/assign?id=' + element.id}>Assign Resource</Link>
            </Space>
          ) : (
            <Space size='middle'>
              <Link
                to='/assign'
                style={{ pointerEvents: 'none', cursor: 'default', color: '#aaa' }}
              >
                Assign Resource
              </Link>
            </Space>
          );
        } else {
          return element.active == true ? (
            <Space size='middle'>
              <Link to={'/assign?id=' + element.id}>Assign Resource</Link>
            </Space>
          ) : (
            <Space size='middle'>
              <Link
                to='/assign'
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
