import PropTypes from 'prop-types';
import { ColumnsType } from 'antd/es/table';
import { Fragment, useEffect, useState } from 'react';
import { Button, Col, Form, Row, Select, Table } from 'antd';

import Drawer from '../../common/Drawer';
import Loader from '../../common/Loader';
import AlertBox from '../../common/Alert';
import { columnsSort } from '../../Table/utils';
import TypographyTitle from '../../common/Title';
import { assignResource } from '../../../apis/resources.api';
import propsInterface from './interfaces/propsInterface';
import vacationTableInterface from './interfaces/vacationTableInterface';

const AssignProject = ({ title, data, open, onClose }: propsInterface) => {
  const [formEndDate] = useState<string>('');
  const [formStartDate] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [vacationData, setVacationData] = useState<vacationTableInterface[]>([]);
  const [alertBoxState, setAlertBoxState] = useState<any>({
    message: '',
    type: '',
  });

  const onFinish = async (values: any) => {
    setLoader(true);
    const response: any = await assignResource(values);
    if (response.status == 200) {
      setLoader(false);
      setAlertBoxState({ message: 'Resource has been assigned', type: 'success' });
    } else {
      setLoader(false);
      setAlertBoxState({ message: 'Some Error Occured', type: 'error' });
    }
  };

  const handleChange = (value: string) => {
    setProject(value);
    return project;
  };

  const [form] = Form.useForm();

  const vacationColumns: ColumnsType<vacationTableInterface> = [
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
      render: (text, record) => {
        return {
          props: {
            style: {
              color:
                Date.parse(formStartDate) > Date.parse(record.startDate) &&
                Date.parse(formEndDate) < Date.parse(record.endDate)
                  ? 'red'
                  : 'black',
            },
          },
          children: text,
        };
      },
      sorter: (a, b) => columnsSort(a.startDate, b.startDate),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text, record) => {
        return {
          props: {
            style: {
              color:
                Date.parse(formStartDate) > Date.parse(record.startDate) &&
                Date.parse(formEndDate) < Date.parse(record.endDate)
                  ? 'red'
                  : 'black',
            },
          },
          children: text,
        };
      },
      sorter: (a, b) => columnsSort(a.endDate, b.endDate),
    },
  ];
  /*
  const onStartDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setFormStartDate(dateString);
  };

  const onEndDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setFormEndDate(dateString);
  };
  */

  useEffect(() => {
    setVacationData(data?.vacations);
  }, []);

  return (
    <Fragment>
      <Drawer title={title} placement='right' onClose={onClose} open={open}>
        <div className='drawer-content'>
          <Form
            name='benchedResource'
            form={form}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete='off'
            onFinish={onFinish}
          >
            <Form.Item label='Resource Name' name='resourcename'>
              <Select placeholder={data?.name} disabled />
            </Form.Item>

            <Form.Item
              label='Project Name  '
              name='project'
              rules={[{ required: true, message: 'Please select a project!' }]}
            >
              <Select
                placeholder='Select a Project'
                onChange={handleChange}
                options={[
                  {
                    value: 'Erase',
                    label: 'Erase',
                  },
                  {
                    value: 'PES Spills',
                    label: 'PES Spills',
                  },
                  {
                    value: 'Grubr',
                    label: 'Grubr',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label='Weekly Hours'
              name='weeklyHours'
              rules={[{ required: true, message: 'Please select Allocation Hours!' }]}
            >
              <Select
                placeholder='Select Allocation Hours'
                options={[
                  {
                    value: '20',
                    label: '20',
                  },
                  {
                    value: '50',
                    label: '50',
                  },
                  {
                    value: '80',
                    label: '80',
                  },
                  {
                    value: '100',
                    label: '100',
                  },
                ]}
              />
            </Form.Item>

            <TypographyTitle level={5}>Vacations</TypographyTitle>
            <Table
              columns={vacationColumns}
              dataSource={vacationData}
              bordered
              rowClassName={(record: { endDate: string }) =>
                Date.parse(record.endDate) < Date.parse(new Date().toString()) ? 'gray' : 'black'
              }
            ></Table>

            <div className='drawer-content'>
              <Row justify='end' gutter={24}>
                <Col>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='submit'>
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='reset'>
                      Reset
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
          {alertBoxState ? (
            <AlertBox message={alertBoxState.message} type={alertBoxState.type} />
          ) : (
            <></>
          )}
          {loader ? <Loader /> : <></>}
        </div>
      </Drawer>
    </Fragment>
  );
};

AssignProject.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssignProject;
