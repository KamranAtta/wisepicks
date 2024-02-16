import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { sendMail } from '../../../apis/fixture.api';
import { MESSAGES } from '../../../utils/constant';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';

 interface messageInterface {
    email:string;
    firstName:string;
    lastName:string;
    message: string;
    name: string;
}

export default function ContactUsComponent() {
    const [loader, setLoader] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFinish = async (values: messageInterface) => {
        setLoader(true);
        try {
            const payload = {
                email: values?.email,
                name: `${values?.firstName}  ${values?.lastName}`,
                message: values?.message,
            }
            await sendMail(payload);
            notification.open({
                message: MESSAGES.EMAIL_SUCCESS
            });
            navigate('/')
            setLoader(false); 
        } catch (error) {
            notification.open({
                message: MESSAGES.EMAIL_FAILURE
            });
        }
    };

    return (
        <>
            <Row style={{display: 'flex', justifyContent:'center', margin: '20px'}}>
                <Col span={12}>
                    <Card title='Contact Us' color='red'>
                        <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                            <Form.Item name="firstName" label="First Name">
                                <Input prefix={<UserOutlined />} />
                            </Form.Item>
                            <Form.Item name="lastName" label="Last Name">
                                <Input prefix={<UserOutlined />}/>
                            </Form.Item>
                            <Form.Item name="email" label="Email">
                                <Input prefix={<MailOutlined />}/>
                            </Form.Item>
                            <Form.Item name="message" label="Message">
                                <TextArea rows={8} />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
            {loader ? <Loader /> : <></>}
        </>
    );
};