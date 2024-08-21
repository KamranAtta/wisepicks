import React from 'react';
import { Row, Col } from 'antd';
import { styles } from '../../styles';
import { DynammicTalksArray, talksInterface } from '../interfaces';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';

export default function Talks({data}: DynammicTalksArray) {
    const matches = useMediaQuery('(min-width: 768px)');

  return (
    <Row gutter={24}>
        {
            data?.videos?.map((video: talksInterface, index: number)=> {
                return <Col key={index} span={matches ? data?.spanSize:6}  xs={matches ? 24: 6} sm={matches ? data?.spanSize: 6} style={styles.card}>
                    <Link to={`/videos/${video?.category}/${video?.id}`}>
                        <div className='video-container'>
                            <img
                            alt={video?.title}
                            src={video?.thumbnail}
                            style={styles.bRadius}
                            className='movie-image'
                            />
                            {/* <Typography.Text style={{...styles.duration, position: 'relative', textAlign: 'center', fontSize: '12px'}}>
                            {video?.views} views | {dayjs(video?.publishedAt).format('MMM YYYY')} - {video?.duration}
                            </Typography.Text> */}
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