import React from 'react';
import { Row, Col, Button } from 'antd';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { styles } from '../../styles';
import { featuredTalk } from '../../utils/constant';

export default function TalkDetail() {
    const matches = useMediaQuery('(min-width: 830px)');
    

    return (
        <Row gutter={24} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px', paddingTop:'10px'}}>
            <Col span={22}>
                <Row gutter={24}>
                    <Col span={15}  xs={24} sm={15} style={styles.card}>
                    <div style={{width: '100%', height: '500px',background: 'black'}}>

                    </div>
                    </Col>
                    <Col span={8}  xs={24} sm={8} style={styles.card}>
                        <div>
                            <h1 style={{fontSize: '2.25rem'}}>{featuredTalk?.title}</h1>
                            <p style={{fontSize: '1rem'}}>{featuredTalk?.description}</p>
                        </div>
                        <Button style={matches ? {...styles.watchButton, position: 'absolute'} : {}}>Watch Now</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};