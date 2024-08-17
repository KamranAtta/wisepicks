import React from 'react';
import { Row, Col, Typography } from 'antd';
import { styles } from '../../styles';
// import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { PlayCircleOutlined } from '@ant-design/icons';
import { talksInterface } from '../interfaces';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';

const contentStyle: React.CSSProperties = {
    color: '#ffffff',
    lineHeight: '300px',
    textAlign: 'center',
  };

export default function Slider({data}: any) {
  const matches = useMediaQuery('(min-width: 678px)');

  return (
    <Row gutter={24} style={{...contentStyle, height: matches ? '20vw': '100vw'}}>
        {
            data?.map((video: talksInterface, index:number)=> {
                return <Col key={index} span={3}  xs={24} sm={3} style={styles.card}>
                  <Link to={`/videos/${video?.category}/${video?._id}`}>
                    <div className='video-container'>
                        <>
                        <img
                        alt={video?.title}
                        src={video?.thumbnail}
                        style={styles.bRadius}
                        />
                        <Typography.Text style={{...styles.duration, position: 'relative', textAlign: 'end'}}>
                            {video?.duration}
                        </Typography.Text>
                        </>
                      <div className="play-button" style={{top: '23%'}}>
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