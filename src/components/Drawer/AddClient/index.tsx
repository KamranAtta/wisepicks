/* eslint-disable no-console */
import { Fragment } from 'react';
import { Button, Col, Form, Input, Row, notification } from 'antd';
import { addClients, getClients } from '../../../apis';
import propsInterface from './interface';
import PropTypes from 'prop-types';
import DrawerComponent from '../../common/Drawer';
import { client } from '../../Form/interfaces/clientInterface';
import { MESSAGES } from '../../../utils/constant';
const AddClient = ({ title, open, onClose, setClientFormOpen, setClients }: propsInterface) => {
  const onFinish = async (values: object) => {
    const code: number = await addClients(values);
    if (code == 200) {
      notification.open({
        message: MESSAGES.CLIENT_ADD_SUCCESS,
      });
      setClientFormOpen(false);
      const data: client[] = await getClients();
      setClients(data);
    } else {
      notification.open({
        message: MESSAGES.ERROR,
      });
    }
  };

  return (
    <Fragment>
      <DrawerComponent title={title} placement='right' onClose={onClose} open={open}>
        <div className='drawer-content'>
          <Form
            name='benchedResource'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            autoComplete='off'
            onFinish={onFinish}
          >
            <Form.Item
              label='Name'
              name='name'
              rules={[{ required: true, message: 'Please input client name!' }]}
            >
              <Input />
            </Form.Item>

            <Row justify='end' gutter={24}>
              <Col>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type='primary' htmlType='reset'>
                    Reset
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </DrawerComponent>
    </Fragment>
  );
};

AddClient.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  setClientFormOpen: PropTypes.func.isRequired,
};

export default AddClient;
