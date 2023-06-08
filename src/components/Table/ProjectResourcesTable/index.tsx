import type { ColumnsType } from 'antd/es/table';
import { List, Space, Table, Row } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';

import { columnsSort } from '../utils';
import ProjectResourcesInterface, { ProjectResourceTableI } from './interface';
import { getResources, deleteResource, getProjectDetails } from '../../../apis';
import TypographyTitle from '../../common/Title';

export default function ProjectResourcesTable({ resourceQuery }: ProjectResourceTableI) {
  const [resources, setResources] = useState<unknown>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const fetchResources = async () => {
    setLoader(true);
    const resourceList = await getResources(resourceQuery.query);
    setResources(resourceList);
    setLoader(false);
  };

  const removeFromProject = async (id: number) => {
    setLoader(true);
    const response = await deleteResource({ id: id });
    if (response.status == 200) {
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get('id');
      const response = await getProjectDetails(projectId as unknown as number);
      setResources(response.resources);
    }
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
        <TypographyTitle level={4}>Resources</TypographyTitle>
      </Row>
      <Table
        columns={columns}
        dataSource={resources as ProjectResourcesInterface[]}
        loading={loader}
        scroll={{ x: 'max-content' }}
        bordered
      />
    </>
  );
}
