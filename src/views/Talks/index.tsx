import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { styles } from '../../styles';
import Meta from 'antd/es/card/Meta';
import { DynammicTalksArray, talksInterface } from '../interfaces';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { PlayCircleOutlined } from '@ant-design/icons';

export default function Talks({data}: DynammicTalksArray) {

  return (
    <Row gutter={24}>
        {
            data?.videos?.map((video: talksInterface, index: number)=> {
                return <Col key={index} span={data?.spanSize}  xs={24} sm={data?.spanSize} style={styles.card}>
                    <Link to={`/talks/${video?.category}/${video?.id}`}>
                        <div className='video-container'>
                            <Card
                            style={styles.card}
                            cover={
                                <>
                                    <img
                                    alt={video?.title}
                                    src={video?.thumbnail}
                                    style={styles.bRadius}
                                    />
                                    <Typography.Text style={{...styles.duration, position: 'relative', textAlign: 'end'}}>
                                        {video?.duration}
                                    </Typography.Text>
                                    <Typography.Text style={{paddingLeft: '10px'}}>
                                        {video?.views} views | {dayjs(video?.publishedAt).format('MMM YYYY')}
                                    </Typography.Text>
                                </>
                                }
                            >
                            <Meta
                            title={video?.title}
                            />
                            </Card>
                            <div className="play-button">
                            <PlayCircleOutlined />
                            </div>
                        </div>
                    </Link>
                </Col>
            })
        }
    </Row>
  );
};