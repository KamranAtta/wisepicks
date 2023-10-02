/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Row, Col, Steps, Collapse, Table, StepProps, List, Space, notification } from 'antd';

import { columnsSort } from '../Table/utils';
import { StepsProps } from './interfaces/StepsInterface';
import { getProject, getAllResourcesSorted } from '../../apis';
import ResourcesInterface from './interfaces/resourceInterface';
import AssignProject from '../Drawer/AssignProject/AssignProject';
import { resourceListDataType } from '../Table/ResourceTable/interfaces/resourceListInterface';
import {
  SortedResourcesInterface,
  SortedResourcesProjectsInterface,
} from './interfaces/sortedResourceInterface';
import { MESSAGES } from '../../utils/constant';
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
  const [resourcePlan, setResourcePlan] = useState<any>([]);
  const [projectPlan, setProjectPlan] = useState<any>([]);
  const [resourceData, setResourceData] = useState<resourceListDataType>();

  const fetchResources = async (level: string, team: string, availability: string) => {
    // On backend pagination has been implemented. Not on frontend
    // eslint-disable-next-line quotes
    const response: any = await getAllResourcesSorted(
      `page=1&pageSize=10&level=${level}&team=${team}&availability=${availability}`,
    );
    if (response.statusCode == 200) {
      const data = response?.data?.rows;
      return data;
    } else {
      notification.open({
        message: MESSAGES.ERROR,
      });
    }
  };

  const getProjectPlanData = async (projectId: string | null) => {
    const response = await getProject(projectId as string);
    // TODO: Define interface for project Resources
    const resourcePlan = await Promise.all(
      response?.data?.projectResources.map(async (element: any) => {
        const data = await fetchResources(element.level, element.team?.name, element.fte);
        return data;
      }),
    );

    setResourcePlan(resourcePlan);
    setProjectPlan(response?.data);
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const showFormDrawer = (element: any) => {
    setFormOpen(true);
    setResourceData(element as resourceListDataType);
  };

  const renderCustomCell = (object: Array<SortedResourcesProjectsInterface>) => {
    if (object[0].project_name != null) {
      return (
        <List
          size='small'
          dataSource={object}
          renderItem={(item: any) => (
            <List.Item>
              {item.project_name} | {item.fte}
            </List.Item>
          )}
        />
      );
    } else {
      return <div>-</div>;
    }
  };

  useEffect(() => {
    getProjectPlanData(id);
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
      dataIndex: 'projects',
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
              {projectPlan?.projectResources?.map((resource: any, index: number) =>
                resource?.team?.name === steps[current] ? (
                  <Panel
                    key={resource.key}
                    header={resource?.level + ' Engineer - ' + resource?.fte}
                  >
                    <Table
                      columns={columns}
                      dataSource={resourcePlan[index]}
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
