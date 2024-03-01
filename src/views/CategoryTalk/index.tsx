import React, { useEffect, useState } from 'react';
import { Row, Col, Typography } from 'antd';
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
        <Row style={{...styles.searchBarContainer, paddingBottom: '10px', paddingTop: '10px'}}>
            <Col span={12}>
                <SearchBar/>
            </Col>
        </Row>
        <TalkCategories categoryName={categoryName}></TalkCategories>
        <Row gutter={24} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px'}}>
            <Col span={20}>
                <Typography.Title 
                level={3} 
                style={{ marginBottom: '20px'}}>
                Search results for {categoryName ?? searchTerm } Talks
                </Typography.Title>
                {talks?.videos.length ? <Talks data={talks}></Talks>: 
                <Typography.Text style={{display: 'flex', justifyContent: 'center',marginBottom: '20px'}}>No Talks Found</Typography.Text>}
            </Col>
        </Row>
        {loader ? <Loader /> : <></>}
    </>
  );
};