import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { styles } from '../../styles';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { PlayCircleOutlined } from '@ant-design/icons';
import { talksInterface } from '../interfaces';

const contentStyle: React.CSSProperties = {
    height: '300px',
    color: '#ffffff',
    lineHeight: '300px',
    textAlign: 'center',
  };

export default function Slider({data}: any) {

  return (
    <Row gutter={24} style={contentStyle}>
        {
            data?.map((video: talksInterface, index:number)=> {
                return <Col key={index} span={8}  xs={24} sm={8} style={styles.card}>
                  <Link to={`/talks/${video?.category}/${video?._id}`}>
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
                        </>
                      }
                  >
                      <Meta
                      title={video?.title}
                      />
                      </Card>
                      <div className="play-button" style={{top: '40%'}}>
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