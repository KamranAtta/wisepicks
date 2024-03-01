import React from 'react';
import { Row, Col, Button } from 'antd';
import { talkCategories } from '../../utils/constant';
import { Link } from 'react-router-dom';
import { styles } from '../../styles';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';

export default function TalkCategories({categoryName}: any) {
    const matches = useMediaQuery('(min-width: 768px)');

  return (
    <Row gutter={24} style={{display: 'flex', justifyContent:'center', textAlign:'center'}}>
            <Col span={matches ? 19 : 24}>
                <Row gutter={24}>
                    {
                        talkCategories?.map((category: string, index: number)=> {
                            return <Col key={index} span={3} xs={matches ? 24: 8} sm={3} style={{padding:'3px'}}>
                                {
                                    <Link to={`/topic/${category}`} >
                                        <Button style={categoryName === category ? styles.selectedCategoryButton: styles.categoryButton}>{category}</Button>
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