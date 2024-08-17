import React, { useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { styles } from '../../styles';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { getCategoriesForTitle } from '../../utils/getCategories';

export default function TalkCategories({categoryName}: any) {
    const matches = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <Row gutter={24} style={{display: 'flex', justifyContent:'center', textAlign:'center'}}>
            <Col span={matches ? 19 : 24}>
                <Row gutter={24}>
                    {
                        getCategoriesForTitle(categoryName)?.map((category: string, index: number)=> {
                            return <Col key={index} span={6} xs={matches ? 24: 8} sm={6} style={{padding:'3px'}}>
                                {
                                    <Link to={`/${categoryName}/${category}`} >
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