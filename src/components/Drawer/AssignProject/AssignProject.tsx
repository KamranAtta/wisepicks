import PropTypes from 'prop-types';
import { ColumnsType } from 'antd/es/table';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Button, Col, DatePicker, Form, Row, Select, Table } from 'antd';

import Drawer from '../../common/Drawer';
import Loader from '../../common/Loader';
import { columnsSort } from '../../Table/utils';
import TypographyTitle from '../../common/Title';
import { assignResource } from '../../../apis/resources.api';
import propsInterface from './interfaces/propsInterface';
import { getProjectList } from '../../../apis/projects.api';
import vacationTableInterface from './interfaces/vacationTableInterface';
import NotificationComponent, { NotificationHandlerProps } from '../../common/Notification';

const styles = {
  datePicker: { width: '100%' } as React.CSSProperties,
};

const AssignProject = ({ title, data, open, onClose }: propsInterface) => {
  const resetRef = useRef(null);
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const { contextHolder, notificationHandler } = NotificationComponent();

  const [projects, setProjects] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [vacationData, setVacationData] = useState<vacationTableInterface[]>([]);
  const [formEndDate] = useState<string>('');
  const [formStartDate] = useState<string>('');

  const preFetchData = async () => {
    const projectList = await getProjectList();
    setProjects(projectList);
  };

  const formDataTransformation = (values: any, resourceData = data as any) => {
    const { project, weeklyHours, ...rest } = values;
    let transformedData = { ...rest, projectId: project, fte: weeklyHours, ...rest };
    if (transformedData?.startDate) {
      transformedData = {
        ...transformedData,
        startDate: transformedData?.startDate?.toISOString(),
      };
    }
    if (transformedData?.endDate) {
      transformedData = { ...transformedData, endDate: transformedData?.endDate?.toISOString() };
    }
    if (transformedData?.expectedDate?.length > 0) {
      const expectedDate = transformedData?.expectedDate?.map((date: any) => date?.toISOString());
      transformedData.expectedStartDate = expectedDate[0];
      transformedData.expectedEndDate = expectedDate[1];
    }
    transformedData = resourceData?.team_id
      ? { ...transformedData, teamId: resourceData?.team_id }
      : transformedData;
    transformedData = resourceData?.assigned_level
      ? { ...transformedData, level: resourceData?.assigned_level }
      : transformedData;
    transformedData = resourceData?.id
      ? { ...transformedData, resourceId: resourceData?.id }
      : transformedData;
    return transformedData;
  };

  const onFinish = async (values: object) => {
    let notificationConfig: NotificationHandlerProps = {
      type: 'success',
      message: 'Resource Assigned',
      description: 'Resource has been assigned',
    };
    setLoader(true);
    const tranformedValues = formDataTransformation(values);
    const response = await assignResource(tranformedValues);
    if (response.status == 201) {
      (resetRef?.current as any)?.click();
    } else {
      notificationConfig = {
        type: 'error',
        message: 'Error Occured',
        description: 'Error in Resource assignment',
      };
    }
    setLoader(false);
    notificationHandler(notificationConfig);
  };

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
    preFetchData();
    setVacationData(data?.vacations);
  }, []);

  return (
    <Fragment>
      {contextHolder}
      <Drawer title={title} placement='right' onClose={onClose} open={open}>
        <div className='drawer-content'>
          <Form
            name='benchedResource'
            form={form}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ resourceName: data?.name }}
            autoComplete='off'
            onFinish={onFinish}
          >
            <Form.Item label='Resource Name' name='resourceName'>
              <Select value={data?.name} disabled />
            </Form.Item>

            <Form.Item
              label='Project Name'
              name='project'
              rules={[{ required: true, message: 'Please select a project!' }]}
            >
              <Select
                placeholder='Select a Project'
                options={projects?.map((project: any) => ({
                  value: project?.id,
                  label: project?.name,
                }))}
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

            <Form.Item
              name='expectedDate'
              label='Expected Date:'
              rules={[{ type: 'array' as const, required: true, message: 'Please select time!' }]}
            >
              <RangePicker />
            </Form.Item>

            <Form.Item name='startDate' label='Start Date:' rules={[{ type: 'object' as const }]}>
              <DatePicker style={styles.datePicker} />
            </Form.Item>
            <Form.Item name='endDate' label='End Date:' rules={[{ type: 'object' as const }]}>
              <DatePicker style={styles.datePicker} />
            </Form.Item>

            <TypographyTitle level={5}>Vacations</TypographyTitle>
            <Table
              columns={vacationColumns as any}
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
                    <Button type='primary' htmlType='reset' ref={resetRef}>
                      Reset
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
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
