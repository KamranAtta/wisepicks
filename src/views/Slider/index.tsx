import React from 'react';
import { Row, Col, Card } from 'antd';
import { styles } from '../../styles';
import Meta from 'antd/es/card/Meta';

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
            data?.map((trending:any, index:number)=> {
                return <Col key={index} span={8}  xs={24} sm={8} style={styles.card}>
                    <Card
                    style={styles.card}
                    cover={
                    <img
                      height={250}
                      alt="example"
                      src={trending?.thumbnail}
                    />
                    }
                >
                    <Meta
                    title={trending?.title}
                    />
                    </Card>
                    </Col>
            })
        }
    </Row>
  );
};