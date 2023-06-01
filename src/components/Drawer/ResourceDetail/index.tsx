import PropTypes from 'prop-types';
import { Col, Drawer, Row, Space, Table } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';

import { ColumnsType } from 'antd/es/table';
import TypographyText from '../../common/Text';
import { columnsSort } from '../../Table/utils';
import TypographyTitle from '../../common/Title';
import PropsInterface from '../../Table/ResourceTable/interfaces/propsInterface';
import VacationTableInterface from '../../Table/ResourceTable/interfaces/vacationTableInterface';

const vacationInterface: ColumnsType<VacationTableInterface> = [
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

const ResourceDetail = ({ title, data, open, onClose }: PropsInterface) => {
  const [vacationData, setVacationData] = useState<VacationTableInterface[]>([]);
  useEffect(() => {
    setVacationData(data?.vacations);
  }, []);
  return (
    <Fragment>
      <Drawer title={title} placement='right' onClose={onClose} open={open}>
        <div className='drawer-content'>
          <Row gutter={16}>
            <Col span={12}>
              <Space direction={'vertical'}>
                <Row gutter={16}>
                  <Col span={24}>
                    <TypographyTitle level={5}>Name</TypographyTitle>
                  </Col>
                  <Col span={24}>
                    <TypographyText>{data?.name}</TypographyText>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <TypographyTitle level={5}>Team</TypographyTitle>
                  </Col>
                  <Col span={24}>
                    <TypographyText>{data?.team}</TypographyText>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <TypographyTitle level={5}>Email</TypographyTitle>
                  </Col>
                  <Col span={24}>
                    <TypographyText>{data?.email}</TypographyText>
                  </Col>
                </Row>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction={'vertical'}>
                <Row gutter={16}>
                  <Col span={24}>
                    <TypographyTitle level={5}>Level</TypographyTitle>
                  </Col>
                  <Col span={24}>
                    <TypographyText>{data?.level}</TypographyText>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <TypographyTitle level={5}>Phone</TypographyTitle>
                  </Col>
                  <Col span={24}>
                    <TypographyText>{data?.phone}</TypographyText>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <TypographyTitle level={5}>Joining Date</TypographyTitle>
                  </Col>
                  <Col span={24}>
                    <TypographyText>{data?.joiningDate}</TypographyText>
                  </Col>
                </Row>
              </Space>
            </Col>
          </Row>
          <div className='drawer-components'>
            <TypographyTitle level={5} style={{ marginBottom: '1em' }}>
              Vacations
            </TypographyTitle>
            <Table
              columns={vacationInterface}
              dataSource={vacationData}
              bordered
              rowClassName={(record) =>
                Date.parse(record.endDate) < Date.parse(new Date().toString()) ? 'gray' : 'black'
              }
            ></Table>
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};

ResourceDetail.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResourceDetail;
