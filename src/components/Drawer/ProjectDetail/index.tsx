import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Col, Collapse, Form, Row, Space, Table, Typography } from 'antd';

import propsInterface from './interfaces/propsInterface';
import VacationTableInterface from './interfaces/vacationTableInterface';
import { Link } from 'react-router-dom';
import { columnsSort } from '../../Table/utils';
import Drawer from '../../common/Drawer';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ProjectDetail = ({ title, data, open, onClose }: propsInterface) => {
  const vacationColumns: ColumnsType<VacationTableInterface> = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => columnsSort(a.type, b.type),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => columnsSort(a.startDate, b.startDate),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) => columnsSort(a.endDate, b.endDate),
    },
  ];

  return (
    <Fragment>
      <Drawer title={title} placement='right' onClose={onClose} open={open}>
        <div className='drawer-content'>
          <Row gutter={16}>
            <Col span={12}>
              <Space direction={'vertical'}>
                <Row gutter={16}>
                  <Col span={24}>
                    <Title level={5}>Project Name</Title>
                  </Col>
                  <Col span={24}>
                    <Text>{data?.name}</Text>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Title level={5}>Client</Title>
                  </Col>
                  <Col span={24}>
                    <Text>{data?.client}</Text>
                  </Col>
                </Row>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction={'vertical'}>
                <Row gutter={16}>
                  <Col span={24}>
                    <Title level={5}>Start Date</Title>
                  </Col>
                  <Col span={24}>
                    <Text>{data?.startDate || '-'}</Text>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Title level={5}>End Date</Title>
                  </Col>
                  <Col span={24}>
                    <Text>{data?.endDate || '-'}</Text>
                  </Col>
                </Row>
              </Space>
            </Col>
          </Row>
          <div className='drawer-components'>
            <Title level={5}>Resources</Title>
            {data?.resources?.map((element: any) => (
              <Collapse key={element.key}>
                <Panel key={''} header={element.name}>
                  <Title level={5}>{element.level + '-' + element.team + ' Engineer'}</Title>
                  <Text>
                    {'Deployed from ' + element.startDate + ' to ' + element.endDate + '\n'}
                  </Text>
                  <Text>{'Hours Per Week: ' + element.hoursPerWeek}</Text>
                  <Table
                    columns={vacationColumns}
                    dataSource={element.vacations}
                    bordered
                    rowClassName={(record) =>
                      Date.parse(record.endDate) < Date.parse(new Date().toString())
                        ? 'gray'
                        : 'black'
                    }
                  ></Table>
                </Panel>
              </Collapse>
            ))}
          </div>
          <Row justify='end' style={{ marginTop: 16 }}>
            <Form.Item>
              <Link to={'/cloneProject?id=' + data?.id}>
                <Button type='primary' style={{ marginRight: '10px' }}>
                  Clone Project
                </Button>
              </Link>
            </Form.Item>

            <Form.Item>
              <Link to={'/editProject?id=' + data?.id}>
                <Button type='primary'>Edit Project</Button>
              </Link>
            </Form.Item>

            <Form.Item>
              <Link to={'/request-resource?id=' + data?.id}>
                <Button type='primary'>Request Resources</Button>
              </Link>
            </Form.Item>
          </Row>
        </div>
      </Drawer>
    </Fragment>
  );
};

ProjectDetail.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectDetail;
