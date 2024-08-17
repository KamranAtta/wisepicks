import React, { useEffect, useState } from 'react';
import { Row, Col, Typography } from 'antd';
import { talkTypes } from '../../utils/constant';
import Talks from '../Talks';
import { talkDataInterface } from '../interfaces';
import { useLocation, useParams } from 'react-router-dom';
import TalkCategories from '../TalkCategories';
import Loader from '../../components/common/Loader';
import { getMovies, getShows } from '../../apis/fixture.api';
import SearchBar from '../../components/common/Search';
import { styles } from '../../styles';
import { getCategoriesForTitle } from '../../utils/getCategories';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';

export default function CategoryTalks() {
    const { categoryName, subCategoryName } = useParams();
    const [talks, setTalks] = useState<talkDataInterface>();
    const [loader, setLoader] = useState<boolean>(false);
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const searchTerm = searchParams.get('search');
    const matches = useMediaQuery('(min-width: 768px)');

    const createCategoryTalks = async () => {
        setLoader(true);
        const subCategories = categoryName ? getCategoriesForTitle(categoryName): [];
        const filter = subCategoryName ? [subCategoryName]: categoryName ? subCategories: [];
        const response = categoryName != 'tv-shows'? await getMovies({ type: categoryName, category: filter, searchTerm: searchTerm }) 
        :await getShows({ type: categoryName, category: filter, searchTerm: searchTerm });
        const allTalks = response?.data;
        setTalks({
            videos: allTalks,
            spanSize: categoryName == 'Trailers'? talkTypes.searchVideos.spanSize: talkTypes.categoryTalks.spanSize,
        });
        setLoader(false);
    }

    useEffect(() => {
        createCategoryTalks();
      }, [categoryName, search, subCategoryName]);

  return (
    <>
        {!matches && <Row style={{...styles.searchBarContainer, paddingBottom: '10px', paddingTop: '10px'}}>
            <Col span={12}>
                <SearchBar/>
            </Col>
        </Row>}
        <TalkCategories categoryName={categoryName}></TalkCategories>
        <Row gutter={24} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px'}}>
            <Col span={20}>
                <Typography.Title 
                level={3} 
                style={{ marginBottom: '20px'}}>
                Search results for {categoryName ?? searchTerm }
                </Typography.Title>
                {talks?.videos?.length ? <Talks data={talks}></Talks>: 
                loader ? <></>: <Typography.Text style={{display: 'flex', justifyContent: 'center',marginBottom: '20px'}}>No Talks Found</Typography.Text>}
            </Col>
        </Row>
        {loader ? <Loader /> : <></>}
    </>
  );
};