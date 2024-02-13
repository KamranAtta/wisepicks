import React from 'react';
import { Row, Col, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { talkCategories } from '../../utils/constant';
import { Link } from 'react-router-dom';
import { styles } from '../../styles';

export default function TalkCategories({categoryName}: any) {

  return (
    <Row gutter={24} style={{display: 'flex', justifyContent:'center',margin: '10px', textAlign:'center'}}>
            <Col span={19}>
                <Title level={2}>TED Talks: Discover ideas worth spreading</Title>
                <Row gutter={24}>
                    {
                        talkCategories?.map((category: string, index: number)=> {
                            return <Col key={index} span={3} xs={24} sm={3} style={{padding:'10px'}}>
                                {
                                    categoryName === category ?
                                    <Button size='large' style={styles.categoryButton}>
                                        <Link to={`/topic/${category}`} >{category}</Link>
                                    </Button>
                                    :
                                    <Button size='large'>
                                        <Link to={`/topic/${category}`} >{category}</Link>
                                    </Button>

                                }
                        </Col>
                        })
                    }
                </Row>
            </Col>
        </Row>
  );
};