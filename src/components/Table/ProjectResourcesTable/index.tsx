import type { ColumnsType } from 'antd/es/table';
import { List, Space, Table, Row, notification } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { MESSAGES } from '../../../utils/constant';
import { columnsSort } from '../utils';
import ProjectResourcesInterface, { ProjectResourceTableI } from './interface';
// import { getProjectDetails } from '../../../apis';
import { updateProjectResource } from '../../../apis/resources.api';
import { getProjectResources } from '../../../apis/project-resource.api';
import TypographyTitle from '../../common/Title';

export default function ProjectResourcesTable({ resourceQuery }: ProjectResourceTableI) {
  const [resources, setResources] = useState<unknown>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const fetchResources = async () => {
    setLoader(true);
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    // const response = await getProjectDetails(projectId as unknown as number);
    const projectResources = await getProjectResources(projectId as string);
    console.log('ProjectResources:', projectResources);
    const resourceList = [];
    // const assignedProjects = [];
    // if (response?.data?.projectResources.length) {
    //   for (const projectResource of response.data.projectResources) {
    //     if (projectResource.resource_id) {
    //       assignedProjects.push(projectResource?.project?.name);
    //       const r = {
    //         key: projectResource.id,
    //         name: projectResource?.resource?.name,
    //         // email: projectResource?.resource?.email,
    //         // phone: projectResource?.resource?.phone,
    //         team: projectResource?.team?.name,
    //         level: projectResource?.resource?.assigned_level,
    //         joiningDate: projectResource.start_date,
    //         assignedProjects: assignedProjects,
    //         type: projectResource.resource_type,
    //         status: '',
    //       };
    //       resourceList.push(r);
    //     }
    //   }
    // }
    for (const projectResource of projectResources.data) {
      const r = {
        key: projectResource.project_resource_id,
        name: projectResource?.project_name,
        // email: projectResource?.resource?.email,
        // phone: projectResource?.resource?.phone,
        team: projectResource?.team_name,
        level: projectResource?.resource_level,
        joiningDate: projectResource.start_date,
        assignedProjects: ['Erase', 'Ihtimam'],
        type: projectResource.resource_type,
        status: '',
      };
      resourceList.push(r);
    }
    console.log('Resource List:', resourceList);
    setResources(resourceList);
    setLoader(false);
  };

  const removeFromProject = async (data: any) => {
    setLoader(true);
    const id = data.key;
    const payload = {
      resourceId: null,
    };
    const response = await updateProjectResource(id, payload);
    if (response.statusCode == 200) {
      fetchResources();
      notification.open({
        message: MESSAGES.RESOURCE_REMOVE_SUCCESS,
      });
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
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    //   sorter: (a, b) => columnsSort(a.email, b.email),
    // },
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
          <a onClick={() => removeFromProject(element)}>Remove</a>
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
