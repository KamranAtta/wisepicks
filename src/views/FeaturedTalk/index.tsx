import React from 'react';
import { Row, Col, Button } from 'antd';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { styles } from '../../styles';
import { featuredTalkInterface } from '../interfaces';

export default function FeaturedTalk({data}: featuredTalkInterface) {
    const matches = useMediaQuery('(min-width: 830px)');

  return (
    <Row gutter={24}>
        <Col span={12}  xs={24} sm={12} style={styles.card}>
            <div>
                <h1 style={{fontSize: '2.25rem'}}>{data?.title}</h1>
                <p style={{fontSize: '1rem'}}>{data?.description}</p>
            </div>
            <Button style={matches ? {...styles.watchButton, position: 'absolute'} : {}}>Watch Now</Button>
        </Col>
        <Col span={12}  xs={24} sm={12} style={styles.card}>
            <img
                style={{width: '100%'}}
                alt={data?.title}
                src={data?.thumbnail}
            />
        </Col>
    </Row>
  );
};