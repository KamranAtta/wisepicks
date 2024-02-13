import React from 'react';
import { Row, Col, Card } from 'antd';
import { styles } from '../../styles';
import Meta from 'antd/es/card/Meta';
import { DynammicTalksArray, talksInterface } from '../interfaces';
import { Link } from 'react-router-dom';

export default function Talks({data}: DynammicTalksArray) {

  return (
    <Row gutter={24}>
        {
            data?.videos?.map((video: talksInterface, index: number)=> {
                return <Col key={index} span={data?.spanSize}  xs={24} sm={data?.spanSize} style={styles.card}>
                    <Link to={'/talks/all/' + video?.id}>
                        <Card
                        
                        style={styles.card}
                        cover={
                        <img
                            alt="example"
                            src={video?.thumbnail}
                        />
                        }
                    >
                        <Meta
                        title={video?.title}
                        // description={video?.description}
                        />
                        </Card>
                    </Link>
                </Col>
            })
        }
    </Row>
  );
};