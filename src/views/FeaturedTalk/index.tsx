import React from 'react';
import { Row, Col, Typography, Tag } from 'antd';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { styles } from '../../styles';
import { featuredTalkInterface } from '../interfaces';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function FeaturedTalk({data}: featuredTalkInterface) {
    const matches = useMediaQuery('(min-width: 830px)');

  return (
        <Row gutter={24}>
            <Col span={12}  xs={24} sm={12} style={styles.card}>
                <Link to={`/videos/${data.category}/${data.id}`}>
                    <img
                        style={{width: '100%', borderRadius: '2%',maxHeight: '400px'}}
                        alt={data?.title}
                        src={data?.image}
                    />
                </Link>
            </Col>
            <Col span={12}  xs={24} sm={12} style={styles.card}>
                <Link to={`/${data.category}/${data.id}`}>
                    <h1 style={{color: '#000000', fontSize: matches ? '2.25rem': '1.25rem'}}>{data?.title}</h1>
                </Link>
                <Typography.Paragraph ellipsis={{ rows: 3, expandable: true }}>{data?.description}</Typography.Paragraph>
                <br />
                {data?.views && <Typography.Text>{data?.views} Views since {dayjs(data?.publishedAt).format('MMM YYYY')}</Typography.Text>}
                <br />
                {data?.tags?.map((tag: string, index: number)=>{
                    return <Tag key={index} style={styles.Tag}>#{tag}</Tag>
                })}
                {/* <Link to={`/${data.category}/${data.id}`}>
                    <Button style={matches ? {...styles.watchButton, position: 'absolute'} : {display: 'none'}}>Watch Now</Button>
                </Link> */}
            </Col>
        </Row>
  );
};