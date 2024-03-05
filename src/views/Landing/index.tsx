import React, { useEffect, useState } from 'react';
import { Row, Col, Carousel } from 'antd';
import Title from 'antd/es/typography/Title';
import Slider from '../Slider';
import TalkCategories from '../TalkCategories';
import FeaturedTalk from '../FeaturedTalk';
import { talkTypes } from '../../utils/constant';
import Talks from '../Talks';
import { 
    talkDataInterface, 
    // talksInterface 
} from '../interfaces';
import Loader from '../../components/common/Loader';
import { getHomeTalks } from '../../apis/fixture.api';
import { Link } from 'react-router-dom';
import { styles } from '../../styles';
import SearchBar from '../../components/common/Search';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import AboutUs from '../../components/AboutUs';

export default function LandingPage() {
    const matches = useMediaQuery('(min-width: 768px)');
    const [trendings, setTrendings] = useState<talkDataInterface>();
    const [newTalks, setNewTalks] = useState<talkDataInterface>();
    const [featured, setFeatured] = useState<any>();
    const [climate, setClimate] = useState<any>();
    const [future, setFuture] = useState<any>();
    const [loader, setLoader] = useState<boolean>(false);

    const getTalks = async () => {
        setLoader(true);
        const response = await getHomeTalks({});
        const allTalks = response?.data;
        setFeatured(allTalks?.Featured);
        setFuture(allTalks?.Future);
        setTrendings({
            videos: allTalks?.Trending,
            spanSize: talkTypes.trending.spanSize
        });
        setNewTalks({
            videos: allTalks?.Newest?.slice(0, talkTypes.newTalks.totalCards),
            spanSize: talkTypes.newTalks.spanSize,
        });
        setClimate({
            videos: allTalks['Climate Change']?.slice(0, talkTypes.climate.totalCards),
            spanSize: talkTypes.climate.spanSize
        });
        setFuture({
            videos: allTalks?.Future?.slice(0, talkTypes.future.totalCards),
            spanSize: talkTypes.future.spanSize,
        });
        setLoader(false);
    }

    function CategoryTitle({ page, title }: any){
        return <Row gutter={24} style={{display: 'flex', justifyContent: 'space-between', paddingRight: '12px', paddingLeft: '12px'}}>
            <Link to={`/talks/${page}`} style={styles.link}>
                <Title level={3}>{title}</Title>
            </Link>
            <Link to={`/talks/${page}`} style={styles.link}>
                <Title level={5} underline>View All</Title>
            </Link>
        </Row>
    }

    useEffect(() => {
        getTalks();
      }, []);

  return (
    <>
        <Row  style={styles.searchBarContainer}>
            <h1 style={matches ? {fontSize: '30px',paddingRight: '20px'}: { fontSize: '20px'}}>TED Insights: Inspire or get Inspired</h1>
            <Col span={matches ? 12: 24} style={{paddingRight: '10px', paddingLeft: '10px'}}><SearchBar/></Col>
        </Row>
        <TalkCategories></TalkCategories>
        <Row gutter={24} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px'}}>
            <Col span={22}>
                
                <CategoryTitle page={'Newest'} title={'Newest Talks'}></CategoryTitle>
                <Talks data={newTalks}></Talks>
                
                <CategoryTitle page={'Trending'} title={'Trending Talks'}></CategoryTitle>
                <Carousel autoplay>
                    <Slider data={trendings?.videos ? trendings?.videos?.slice(0,3): []}></Slider>
                    <Slider data={trendings?.videos ? trendings?.videos?.slice(3,6): []}></Slider>
                </Carousel>

                <CategoryTitle page={'Featured'} title={'Featured'}></CategoryTitle>
                <Carousel autoplay>
                    {featured?.map((featuredTalk: any, index: number)=>{
                        return <FeaturedTalk key={index} data={featuredTalk}></FeaturedTalk>
                    })}
                </Carousel>

                <CategoryTitle page={'Climate Change'} title={'Climate Change: What needs to be done'}></CategoryTitle>
                <Talks data={climate}></Talks>

                <CategoryTitle page={'Future'} title={'Artificial Intelligince and Future'}></CategoryTitle>
                <Talks data={future}></Talks>

            </Col>
        </Row>
        <div style={{paddingLeft: '10px', paddingRight: '10px'}}><AboutUs noLogo={true}></AboutUs></div>
        {loader ? <Loader /> : <></>}
    </>
  );
};