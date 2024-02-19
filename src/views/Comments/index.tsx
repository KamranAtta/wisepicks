import React from 'react';
import { Typography, Col } from 'antd';
import { styles } from '../../styles';
import CommentForm from '../../components/Form/Comment';

export default function Comments() {

  return (
    <Col span={24} xs={24} style={styles.commentSection}>
        <Typography.Title level={3}>Share your insight from the video</Typography.Title>
        <CommentForm></CommentForm>
    </Col>
  );
};