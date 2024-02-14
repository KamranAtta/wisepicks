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

export default function LandingPage() {
    // const [talks, setTalks] = useState<talksInterface[]>([]);
    const [trendings, setTrendings] = useState<talkDataInterface>();
    const [newTalks, setNewTalks] = useState<talkDataInterface>();
    const [featured, setFeatured] = useState<any>();
    const [climate, setClimate] = useState<any>();
    const [future, setFuture] = useState<any>();
    const [cardVideo, setCardVideo] = useState<any>();
    const [loader, setLoader] = useState<boolean>(false);

    const getTalks = async () => {
        setLoader(true);
        const response = await getHomeTalks({});
        const allTalks = response?.data;
        // setTalks(allTalks);
        setFeatured(allTalks?.Featured);
        setCardVideo(allTalks?.Featured[0]);
        setFuture(allTalks?.Future);
        setTrendings({
            videos: allTalks?.Trending.slice(0, talkTypes.trending.totalCards),
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

    useEffect(() => {
        getTalks();
      }, []);

  return (
    <>
        <TalkCategories></TalkCategories>
        <Row gutter={24} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px'}}>
            <Col span={22}>
                <Title level={3}>Featured</Title>
                <FeaturedTalk data={cardVideo}></FeaturedTalk>

                <Carousel autoplay>
                    <Slider data={featured ? featured?.slice(1,4): []}></Slider>
                    <Slider data={featured ? featured?.slice(4,7): []}></Slider>
                    <Slider data={featured ? featured?.slice(7,10): []}></Slider>
                    {/* <Slider data={talks?.slice(9,12)}></Slider> */}
                </Carousel>

                <Title level={3}>New Talks</Title>
                <Talks data={newTalks}></Talks>

                <Title level={3}>Trending Talks</Title>
                <Talks data={trendings}></Talks>

                <Title level={3}>Climate Change: What needs to be done</Title>
                <Talks data={climate}></Talks>

                <Title level={3}>Artificial Intelligince and Future</Title>
                <Talks data={future}></Talks>

                <Title level={3}>Featured</Title>
                <FeaturedTalk data={featured}></FeaturedTalk>
            </Col>
        </Row>
        {loader ? <Loader /> : <></>}
    </>
  );
};