import { Fragment } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { addClients, getClients } from '../../../apis';
import propsInterface from './interface';
import PropTypes from 'prop-types';
import DrawerComponent from '../../common/Drawer';

const AddClient = ({
  title,
  open,
  onClose,
  setClientFormOpen,
  setAlertBoxState,
  setClients,
}: propsInterface) => {
  const onFinish = async (values: any) => {
    const response: any = await addClients(values);
    if (response.status == 200) {
      setAlertBoxState({ message: 'New Client Has Been Added', type: 'success' });
      setClientFormOpen(false);
      const response: any = await getClients();
      if (response.status == 200) {
        setClients(response.data.data);
      }
    } else {
      setAlertBoxState({ message: 'Some Error Occured', type: 'error' });
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

            <Form.Item label='Details' name='details'>
              <Input.TextArea />
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
