import { List, Space, Tag, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react';

import { columnsSort } from '../utils';
import { getResources } from '../../../apis';
import { ResourceTableI } from './interfaces/ResourceTableInterface';
import { resourceListDataType } from './interfaces/resourceListInterface';

export default function ResourceTable({
  resourceQuery,
  handleResourceDetail,
  handleAssignProject,
}: ResourceTableI) {
  const [resources, setResources] = useState<unknown>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const fetchResources = async () => {
    setLoader(true);
    const resourceList = await getResources(resourceQuery.query);
    setResources(resourceList);
    setLoader(false);
  };

  useEffect(() => {
    fetchResources();
  }, [resourceQuery]);

  const renderCustomCell = (object: Array<string>) => {
    return (
      <List size='small' dataSource={object} renderItem={(item) => <List.Item>{item}</List.Item>} />
    );
  };

  const columns: ColumnsType<resourceListDataType> = [
    {
      title: 'Name',
      render: (element) => <a onClick={() => handleResourceDetail(element)}>{element?.name}</a>,
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
      onFilter: (value, record) => {
        return record.assignedProjects.includes(value as string);
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
      onFilter: (value, record) => {
        return record.type.startsWith(value as string);
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
      onFilter: (value, record) => {
        return record.status.startsWith(value as string);
      },
      sorter: (a, b) => columnsSort(a.status, b.status),
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
      columns={columns}
      dataSource={resources as resourceListDataType[]}
      loading={loader}
      scroll={{ x: 'max-content' }}
      bordered
    />
  );
}
