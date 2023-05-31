/* eslint-disable @typescript-eslint/no-unused-vars */
import { List, Space, Tag, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Fragment, useState, useEffect } from 'react';

import { columnsSort } from '../utils';
import { resourceListDataType } from './interfaces/resourceListInterface';
import { getResources } from '../../../apis';

export default function ResourceTable({ resourceQuery }: any) {
  const [input, setInput] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [resources, setResources] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [singleResourceData, setsingleResourceData] = useState<resourceListDataType | null>(null);

  const fetchResources = async () => {
    const resourceList = await getResources(resourceQuery.query);
    setResources(resourceList);
  };

  useEffect(() => {
    fetchResources();
  }, [resourceQuery]);

  const renderCustomCell = (object: Array<string>) => {
    return (
      <List size='small' dataSource={object} renderItem={(item) => <List.Item>{item}</List.Item>} />
    );
  };

  const showFormDrawer = (element: resourceListDataType) => {
    setsingleResourceData(element);
    setFormOpen(true);
  };

  const showDrawer = (element: resourceListDataType) => {
    setsingleResourceData(element);
    setOpen(true);
  };

  const columns: ColumnsType<resourceListDataType> = [
    {
      title: 'Name',
      render: (element) => <a onClick={() => showDrawer(element)}>{element?.name}</a>,
      sorter: (a, b) => columnsSort(a.name, b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => columnsSort(a.email, b.email),
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
      title: 'Joining Date',
      dataIndex: 'joiningDate',
      key: 'joiningDate',
      sorter: (a, b) => columnsSort(a.joiningDate, b.joiningDate),
    },
    {
      title: 'Assigned Projects',
      dataIndex: 'assignedProjects',
      key: 'assignedProjects',
      filters: [
        {
          text: 'Erase',
          value: 'Erase',
        },
        {
          text: 'PES Spills',
          value: 'PES Spills',
        },
        {
          text: 'SNG',
          value: 'SNG',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record) => {
        return record.assignedProjects.includes(value);
      },
      render: (element) => renderCustomCell(element),
    },
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
      onFilter: (value: any, record) => {
        return record.type.startsWith(value);
      },
      sorter: (a, b) => columnsSort(a.type, b.type),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'Normal' ? 'green' : 'red'}>{status.toUpperCase()}</Tag>
      ),
      filters: [
        {
          text: 'Normal',
          value: 'Normal',
        },
        {
          text: 'Under Utilized',
          value: 'Under Utilized',
        },
        {
          text: 'Over Utilized',
          value: 'Over Utilized',
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
      title: 'Action',
      key: 'action',
      render: (element) => (
        <Space size='middle'>
          <a onClick={() => showFormDrawer(element)}>Assign Project</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={resources}
      loading={loader}
      scroll={{ x: 'max-content' }}
      bordered
    />
  );
}
