import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Title from 'antd/es/typography/Title';
import { talkTypes } from '../../utils/constant';
import Talks from '../Talks';
import { talkDataInterface } from '../interfaces';
import { useLocation, useParams } from 'react-router-dom';
import TalkCategories from '../TalkCategories';
import Loader from '../../components/common/Loader';
import { getTedTalks } from '../../apis/fixture.api';
import SearchBar from '../../components/common/Search';
import { styles } from '../../styles';

export default function CategoryTalks() {
    const { categoryName } = useParams();
    const [talks, setTalks] = useState<talkDataInterface>();
    const [loader, setLoader] = useState<boolean>(false);
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const searchTerm = searchParams.get('search');

    const createCategoryTalks = async () => {
        setLoader(true);
        const response = await getTedTalks({ category: categoryName, searchTerm: searchTerm });
        const allTalks = response?.data;
        setTalks({
            videos: allTalks,
            spanSize: talkTypes.categoryTalks.spanSize
        });
        setLoader(false);
    }

    useEffect(() => {
        createCategoryTalks();
      }, [categoryName, search]);

  return (
    <>
        <Row  style={styles.searchBarContainer}>
            <Col span={12}>
                <SearchBar/>
            </Col>
        </Row>
        <TalkCategories categoryName={categoryName}></TalkCategories>
        <Row gutter={24} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px'}}>
            <Col span={20}>
                <Title 
                level={3} 
                style={{ marginBottom: '20px'}}>
                Search results for {categoryName ?? searchTerm } Talks
                </Title>
                <Talks data={talks}></Talks>
            </Col>
        </Row>
        {loader ? <Loader /> : <></>}
    </>
  );
};