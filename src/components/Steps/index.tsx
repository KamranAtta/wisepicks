import { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Row, Col, Steps, Collapse, Table, StepProps, List } from 'antd';

import { columnsSort } from '../Table/utils';
import { StepsProps } from './interfaces/StepsInterface';
import { getProjectPlan, getResources } from '../../apis';
import ResourcesInterface from './interfaces/resourceInterface';
import ProjectPlanInterface from './interfaces/projectPlanInterface';

const { Panel } = Collapse;

export default function StepsComponent({ id }: StepsProps) {
  const [teams] = useState<string[]>([]);
  const [steps] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [teamsToUse] = useState<StepProps[]>([]);
  const [resources, setResources] = useState<any>([]);
  const [projectPlan, setProjectPlan] = useState<ProjectPlanInterface[]>([]);

  const getProjectPlanData = async (projectId: number) => {
    const response: any = await getProjectPlan(projectId);
    setProjectPlan(response);
  };

  const fetchResources = async () => {
    const resourceList = await getResources('');
    setResources(resourceList);
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const renderCustomCell = (object: Array<string>) => {
    return (
      <List size='small' dataSource={object} renderItem={(item) => <List.Item>{item}</List.Item>} />
    );
  };

  useEffect(() => {
    getProjectPlanData(id);
    fetchResources();
  }, []);

  useEffect(() => {
    if (teams.length < 1) {
      projectPlan.map((object) =>
        object.resources.map((resource) =>
          !teams.includes(resource.team) ? teams.push(resource.team) : {},
        ),
      );
      teams.map((team) => {
        teamsToUse.push({ title: team });
        steps.push(team);
      });
    }
  }, [projectPlan]);

  const columns: ColumnsType<ResourcesInterface> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => columnsSort(a.name, b.name),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      sorter: (a, b) => columnsSort(a.level, b.level),
    },
    {
      title: 'Availability (Per Week)',
      dataIndex: 'hoursPerWeek',
      key: 'hoursPerWeek',
      sorter: (a, b) => columnsSort(a.hoursPerWeek, b.hoursPerWeek),
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
  ];

  return (
    <>
      <Row gutter={[1, 20]}>
        <Col xs={24} md={4}>
          <Steps current={current} onChange={onChange} direction='vertical' items={teamsToUse} />
        </Col>
        <Col xs={24} md={20}>
          <div className='steps-content'>
            <Collapse>
              {projectPlan.map((object) =>
                object.resources.map((resource) =>
                  resource.team === steps[current] ? (
                    <Panel
                      key={resource.key}
                      header={resource.level + ' Engineer - ' + resource.hoursPercentage}
                    >
                      <Table
                        columns={columns}
                        dataSource={resources}
                        scroll={{ x: 'max-content' }}
                        bordered
                      ></Table>
                    </Panel>
                  ) : (
                    <></>
                  ),
                ),
              )}
            </Collapse>
          </div>
        </Col>
      </Row>
    </>
  );
}
