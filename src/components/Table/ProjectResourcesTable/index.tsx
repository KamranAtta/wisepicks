import type { ColumnsType } from 'antd/es/table';
import { List, Space, Table, Row, Typography } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';

import { columnsSort } from '../utils';
import ProjectResourcesInterface from './interface';
import { getResources, deleteResource, getProjectDetails } from '../../../apis';

const { Title } = Typography;
export default function ProjectResourcesTable({ resourceQuery }: any) {
  const [resources, setResources] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const fetchResources = async () => {
    setLoader(true);
    const resourceList = await getResources(resourceQuery.query);
    setResources(resourceList);
    setLoader(false);
  };

  const removeFromProject = async (id: number) => {
    setLoader(true);
    const response: any = await deleteResource({ id: id });
    if (response.status == 200) {
      const urlParams = new URLSearchParams(window.location.search);
      const projectId: any = urlParams.get('id');
      const response: any = await getProjectDetails(projectId);
      setResources(response.resources);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [resourceQuery]);

  const renderCustomCell = (object: Array<string>) => {
    return (
      <List size='small' dataSource={object} renderItem={(item) => <List.Item>{item}</List.Item>} />
    );
  };

  const columns: ColumnsType<ProjectResourcesInterface> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Action',
      key: 'action',
      render: (element) => (
        <Space size='middle'>
          <a onClick={() => removeFromProject(element)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: 8 }}>
        <Title level={4}>Resources</Title>
      </Row>
      <Table
        columns={columns}
        dataSource={resources}
        loading={loader}
        scroll={{ x: 'max-content' }}
        bordered
      />
    </>
  );
}
