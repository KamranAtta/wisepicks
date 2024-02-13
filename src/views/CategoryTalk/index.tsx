import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Title from 'antd/es/typography/Title';
import { talkTypes } from '../../utils/constant';
import Talks from '../Talks';
import { talkDataInterface } from '../interfaces';
import { useParams } from 'react-router-dom';
import TalkCategories from '../TalkCategories';
import Loader from '../../components/common/Loader';
import { getTedTalks } from '../../apis/fixture.api';

export default function CategoryTalks() {
    const { categoryName } = useParams();
    const [talks, setTalks] = useState<talkDataInterface>();
    const [loader, setLoader] = useState<boolean>(false);


    const createCategoryTalks = async () => {
        setLoader(true);
        const response = await getTedTalks({});
        const allTalks = response?.data;
        setTalks({
            videos: allTalks,
            spanSize: talkTypes.categoryTalks.spanSize
        });
        setLoader(false);
    }

    useEffect(() => {
        createCategoryTalks();
      }, []);

  return (
    <>
        <TalkCategories categoryName={categoryName}></TalkCategories>
        <Row gutter={24} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px'}}>
            <Col span={20}>
                <Title 
                level={3} 
                style={{ marginBottom: '20px'}}>
                Search results for {categoryName} Talks
                </Title>
                <Talks data={talks}></Talks>
            </Col>
        </Row>
        {loader ? <Loader /> : <></>}
    </>
  );
};