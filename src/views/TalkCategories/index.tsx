import React from 'react';
import { Row, Col, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { talkCategories } from '../../utils/constant';
import { Link } from 'react-router-dom';
import { styles } from '../../styles';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';

export default function TalkCategories({categoryName}: any) {
    const matches = useMediaQuery('(min-width: 1000px)');

  return (
    <Row gutter={24} style={{display: 'flex', justifyContent:'center',margin: '10px', textAlign:'center'}}>
            <Col span={matches ? 19 : 24}>
                <Title level={matches ? 2 : 4}>TED Insights: Inspire or get Inspired</Title>
                <Row gutter={24}>
                    {
                        talkCategories?.map((category: string, index: number)=> {
                            return <Col key={index} span={3} xs={matches ? 24: 8} sm={3} style={{padding:'10px'}}>
                                {
                                    categoryName === category ?
                                    <Link to={`/topic/${category}`} >
                                        <Button size='large' style={styles.categoryButton}>{category}</Button>
                                    </Link>
                                    :
                                    <Link to={`/topic/${category}`} >
                                        <Button size='large'>{category}</Button>
                                    </Link>
                                }
                        </Col>
                        })
                    }
                </Row>
            </Col>
        </Row>
  );
};