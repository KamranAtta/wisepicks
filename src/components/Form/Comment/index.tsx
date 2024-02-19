import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, notification, Col, List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getCommentsByVideo, updateComments } from '../../../apis/fixture.api';
import { MESSAGES } from '../../../utils/constant';
import Loader from '../../common/Loader';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { useMediaQuery } from '../../../hooks/MediaQuery.hook';
// import { useNavigate } from 'react-router-dom';

 interface commentInterface {
    name:string;
    message: string;
}

interface commentsInterface {
    user: string;
    comment: string;
}

export default function CommentForm() {
    const [loader, setLoader] = useState<boolean>(false);
    const { id } = useParams();
    const [form] = Form.useForm();
    const [comments, setComments] = useState<commentsInterface[]>([]);
    const matches = useMediaQuery('(min-width: 1000px)');

    const fetchComments = async () => {
        const response = await getCommentsByVideo({ videoId: id });
        const data = response?.data?.comments?.map((comment: string)=>{
            return {
                comment: comment,
                user: response?.data?.user,
            }
        });
        setComments(data);
    }
    
    useEffect(()=>{
        fetchComments();
    },[])

    const onFinish = async (values: commentInterface) => {
        setLoader(true);
        try {
            const payload = {
                videoId: id,
                user: values?.name ? `${values?.name}`: 'Anonymous',
                comment: values?.message,
            }
            await updateComments(payload);
            form.resetFields();
            const previousComments = comments;
            if(comments){
                previousComments.unshift({
                    user: payload?.user,
                    comment: payload?.comment,
                });
                setComments(previousComments);
            }else{
                setComments([{
                    user: payload?.user,
                    comment: payload?.comment,
                }]);
            }
            notification.open({
                message: MESSAGES.COMMENT_SUCCESS
            });
            setLoader(false); 
        } catch (error) {
            notification.open({
                message: MESSAGES.COMMENT_FAILURE
            });
        }
    };

    return (
        <>
            <Form name="form_item_path" form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={matches ? 5: 24}>
                        <Form.Item name="name">
                            <Input placeholder='Your Name' prefix={<UserOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col span={matches ? 17 : 24}>
                        <Form.Item name="message" rules={[{ required: true, message: 'Lesson is required' }]}>
                            <TextArea placeholder='Share your thoughts and insights from the video' rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={matches ? 2 : 24}>
                        <Button style={{borderRadius: '5px'}} htmlType="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>
            <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>}
                title={<a href="https://ant.design">{item?.user}</a>}
                description={item?.comment}
                />
            </List.Item>
            )}/>
            {loader ? <Loader /> : <></>}
        </>
    );
};