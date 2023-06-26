/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Row, Col, Steps, Collapse, Table, StepProps, List, Space, notification } from 'antd';

import { columnsSort } from '../Table/utils';
import { StepsProps } from './interfaces/StepsInterface';
import { getResources, getProject, getAllResourcesSorted } from '../../apis';
import ResourcesInterface from './interfaces/resourceInterface';
import AssignProject from '../Drawer/AssignProject/AssignProject';
import { resourceListDataType } from '../Table/ResourceTable/interfaces/resourceListInterface';
import SortedResourcesInterface from './interfaces/sortedResourceInterface';
// import ProjectPlanInterface from './interfaces/projectPlanInterface';

const { Panel } = Collapse;

const styles = {
  mainDivStyle: {
    marginTop: '50px',
  },
};
export default function StepsComponent({ id }: StepsProps) {
  const [steps, setSteps] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [teamsToUse, setTeamsToUse] = useState<StepProps[]>([]);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [resources, setResources] = useState<any>([]);
  const [projectPlan, setProjectPlan] = useState<any>([]);
  const [resourceData, setResourceData] = useState<resourceListDataType>();

  const getProjectPlanData = async (projectId: string | null) => {
    const response = await getProject(projectId as string);
    console.log(response);
    setProjectPlan(response?.data);
  };

  const fetchResources = async () => {
    const response: any = await getAllResourcesSorted('page=1&pageSize=1');
    if (response.statusCode == 200) {
      const data = response?.data?.rows[0];
      console.log(data);
      setResources(data);
    } else {
      notification.open({
        message: 'error',
      });
    }
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const showFormDrawer = (element: any) => {
    // setFormOpen(true);
    console.log(element);
    // setResourceData(element as SortedResourcesInterface);
  };

  const renderCustomCell = (object: Array<string>) => {
    console.log(object[0] != null);
    if (object[0] != null) {
      return (
        <List
          size='small'
          dataSource={object}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      );
    } else {
      return <div>-</div>;
    }
  };

  useEffect(() => {
    getProjectPlanData(id);
    fetchResources();
  }, []);

  useEffect(() => {
    let teams: any[] = [];
    projectPlan?.projectResources?.map((resource: any) =>
      !teams.includes(resource?.team?.name) ? teams.push(resource?.team?.name) : {},
    );
    setSteps(teams);
    teams = teams.map((item: string) => {
      return { title: item };
    });
    setTeamsToUse(teams);
    console.log(teamsToUse);
    console.log(steps);
  }, [projectPlan]);

  const columns: ColumnsType<SortedResourcesInterface> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Level',
      dataIndex: 'assigned_level',
    },
    {
      title: 'Availability (Per Week)',
      dataIndex: 'availability',
    },
    {
      title: 'Assigned Projects',
      dataIndex: 'project_name',
      filterMode: 'tree',
      filterSearch: true,
      render: (element) => renderCustomCell(element),
    },
    {
      title: 'Action',
      render: (element) => (
        <Space size='middle'>
          <a onClick={() => showFormDrawer(element)}>Assign</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[1, 20]} style={styles.mainDivStyle}>
        <Col xs={24} md={4}>
          <Steps current={current} onChange={onChange} direction='vertical' items={teamsToUse} />
        </Col>
        <Col xs={24} md={20}>
          <div className='steps-content'>
            <Collapse>
              {projectPlan?.projectResources?.map((resource: any) =>
                resource?.team?.name === steps[current] ? (
                  <Panel key={resource.key} header={resource.level + ' Engineer - '}>
                    <Table
                      columns={columns}
                      dataSource={resources}
                      scroll={{ x: 'max-content' }}
                    ></Table>
                  </Panel>
                ) : (
                  <></>
                ),
              )}
            </Collapse>
          </div>
        </Col>
      </Row>
      <AssignProject
        title='Assign Resource'
        data={resourceData as resourceListDataType}
        open={formOpen}
        onClose={() => setFormOpen(false)}
      ></AssignProject>
    </>
  );
}
