import React, { useEffect, useState } from 'react';
import { Row, Col, Carousel } from 'antd';
import Title from 'antd/es/typography/Title';
import Slider from '../Slider';
import TalkCategories from '../TalkCategories';
import FeaturedTalk from '../FeaturedTalk';
import { talkTypes } from '../../utils/constant';
import Talks from '../Talks';
import { talkDataInterface, talksInterface } from '../interfaces';
import Loader from '../../components/common/Loader';
import { getTedTalks } from '../../apis/fixture.api';

export default function LandingPage() {
    const [talks, setTalks] = useState<talksInterface[]>([]);
    const [trendings, setTrendings] = useState<talkDataInterface>();
    const [newTalks, setNewTalks] = useState<talkDataInterface>();
    const [featured, setFeatured] = useState<any>();
    const [loader, setLoader] = useState<boolean>(false);

    const getTalks = async () => {
        setLoader(true);
        const response = await getTedTalks({});
        const allTalks = response?.data;
        setTalks(allTalks);
        setFeatured(allTalks[0]);
        setTrendings({
            videos: allTalks.slice(0, talkTypes.trending.totalCards),
            spanSize: talkTypes.trending.spanSize
        });
        setNewTalks({
            videos: allTalks.slice(0, talkTypes.newTalks.totalCards),
            spanSize: talkTypes.newTalks.spanSize,
        });
        setLoader(false);
    }

    useEffect(() => {
        getTalks();
      }, []);

  return (
    <>
        <TalkCategories></TalkCategories>
        <Row gutter={24} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px'}}>
            <Col span={22}>
                <Title level={3}>Featured</Title>
                <FeaturedTalk data={featured}></FeaturedTalk>

                <Title level={3}>Trending Talks</Title>
                <Carousel autoplay>
                    <Slider data={talks.slice(0,3)}></Slider>
                    <Slider data={talks.slice(3,6)}></Slider>
                    <Slider data={talks.slice(6,9)}></Slider>
                    <Slider data={talks.slice(9,12)}></Slider>
                </Carousel>

                <Title level={3}>New Talks</Title>
                <Talks data={newTalks}></Talks>

                <Title level={3}>Trending Talks</Title>
                <Talks data={trendings}></Talks>

                <Title level={3}>New Talks</Title>
                <Talks data={newTalks}></Talks>

                <Title level={3}>Featured</Title>
                <FeaturedTalk data={featured}></FeaturedTalk>
            </Col>
        </Row>
        {loader ? <Loader /> : <></>}
    </>
  );
};