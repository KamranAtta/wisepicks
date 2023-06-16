/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { Button, Col, Collapse, Form, Row, Space, Table } from 'antd';

import Drawer from '../../common/Drawer';
import TypographyText from '../../common/Text';
import { columnsSort } from '../../Table/utils';
import TypographyTitle from '../../common/Title';
import propsInterface from './interfaces/propsInterface';
import VacationTableInterface from './interfaces/vacationTableInterface';

const { Panel } = Collapse;
const styles = {
  button: {
    width: '150px',
  },
};

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
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: (a, b) => columnsSort(a.start_date, b.start_date),
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: (a, b) => columnsSort(a.end_date, b.end_date),
    },
  ];
  console.log('data in project detail', data);

  return (
    <Fragment>
      <Drawer title={title} placement='right' onClose={onClose} open={open}>
        <div className='drawer-content'>
          <Row gutter={16}>
            <Col span={24}>
              <Space direction='vertical' size='small'>
                <Row gutter={16}>
                  <Col span={12}>
                    <TypographyTitle level={5}>Project Name</TypographyTitle>
                    <TypographyText>{data?.name}</TypographyText>
                  </Col>
                  <Col span={12}>
                    <TypographyTitle level={5}>Client Name</TypographyTitle>
                    <TypographyText>{data?.client?.name}</TypographyText>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <TypographyTitle level={5}>Start Date</TypographyTitle>
                    <TypographyText>{data?.start_date || '-'}</TypographyText>
                  </Col>
                  <Col span={12}>
                    <TypographyTitle level={5}>End Date</TypographyTitle>
                    <TypographyText>{data?.end_date || '-'}</TypographyText>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <TypographyTitle level={5}>Expected Start Date</TypographyTitle>
                    <TypographyText>{data?.expected_start_date || '-'}</TypographyText>
                  </Col>
                  <Col span={12}>
                    <TypographyTitle level={5}>Expected End Date</TypographyTitle>
                    <TypographyText>{data?.expected_end_date || '-'}</TypographyText>
                  </Col>
                </Row>
              </Space>
            </Col>
          </Row>
          {/* <div className='drawer-components'>
            <TypographyTitle level={5}>Resources</TypographyTitle>
            {data?.resources?.map((element: any) => (
              <Collapse key={element.key}>
                <Panel key={''} header={element.name}>
                  <TypographyTitle level={5}>
                    {element.level + '-' + element.team + ' Engineer'}
                  </TypographyTitle>
                  <TypographyText>
                    {'Deployed from ' + element.start_date + ' to ' + element.end_date + '\n'}
                  </TypographyText>
                  <TypographyText>{'Hours Per Week: ' + element.hoursPerWeek}</TypographyText>
                  <Table
                    columns={vacationColumns}
                    dataSource={element.vacations}
                    bordered
                    rowClassName={(record) =>
                      Date.parse(record.end_date) < Date.parse(new Date().toString())
                        ? 'gray'
                        : 'black'
                    }
                  ></Table>
                </Panel>
              </Collapse>
            ))}
          </div> */}
          <Row justify='end' style={{ marginTop: 16 }}>
            <Col>
              <Form.Item>
                <Link to={'/clone-project?id=' + data?.id}>
                  <Button type='primary' style={styles.button}>
                    Clone Project
                  </Button>
                </Link>
              </Form.Item>

              <Form.Item>
                <Link to={'/edit-project?id=' + data?.id}>
                  <Button type='primary' style={styles.button}>
                    Edit Project
                  </Button>
                </Link>
              </Form.Item>

              <Form.Item>
                <Link to={'/request-resource?id=' + data?.id}>
                  <Button type='primary' style={styles.button}>
                    Request Resources
                  </Button>
                </Link>
              </Form.Item>
            </Col>
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
