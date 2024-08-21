import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Image } from 'antd';
import {  useParams } from 'react-router-dom';
import { getTedTalksById } from '../../apis/fixture.api';
import Loader from '../../components/common/Loader';
import VideoPlayer from '../VideoPlayer';
import { talksInterface } from '../interfaces';
import Title from 'antd/es/typography/Title';
import { styles } from '../../styles';
// import dayjs from 'dayjs';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
// import { CheckCircleOutlined } from '@ant-design/icons';
import Comments from '../Comments';
import SearchBar from '../../components/common/Search';
import IFramePlayer from '../IFramePlayer';
import './index.css'
import Episodes from './episodes';

export default function TalkDetail() {
    const { categoryName, id } = useParams();
    const matches = useMediaQuery('(min-width: 768px)');
    const [videoDetails, setVideoDetails] = useState<talksInterface>();
    const [relatedTalks, setRelatedTalks] = useState<talksInterface[]>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    const getVideodetails = async () => {
        setLoader(true);
        const response = await getTedTalksById({id: id, category: categoryName});
        setVideoDetails(response?.data?.talk);
        setRelatedTalks(response?.data?.relatedTalks);
        setLoader(false);
    }

    const updateScreenSize = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
      };
    
    useEffect(() => {
        window.scrollTo(0, 0);
        getVideodetails();
    }, [id]);
  
    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    return (
        <>
            {!matches && <Row  style={styles.searchBarContainer}>
                <Col span={22}>
                    <SearchBar/>
                </Col>
            </Row>}
            <Row gutter={22} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px', paddingTop:'10px'}}>
                <Col span={24}>
                    <Row gutter={24}>
                        <Col span={24}  xs={24} sm={24} style={styles.card}>
                            <div className='movie-player' style={{width: screenWidth, height: screenHeight}}>
                                {
                                    videoDetails?.videoId ? <VideoPlayer videoId={videoDetails?.videoId}></VideoPlayer> :
                                    <IFramePlayer url={videoDetails?.iframeURL}></IFramePlayer>
                                }
                            </div>
                            <Divider></Divider>
                            {/* <Row>
                                <Typography.Title level={matches ? 2 : 4}>{videoDetails?.title}</Typography.Title>
                                <p style={{fontSize: '1rem'}}>{videoDetails?.description}</p>
                                <br />
                                <Typography.Text>{videoDetails?.views} Views since {dayjs(videoDetails?.publishedAt).format('MMM YYYY')}</Typography.Text>
                                <Row>
                                    {videoDetails?.tags?.map((tag: string, index: number)=>{
                                        return <Tag key={index} style={styles.Tag}>#{tag}</Tag>
                                    })}
                                </Row>
                            </Row> */}
                        </Col>
                    </Row>
                </Col>
                {loader ? <Loader /> : <></>}
            </Row>
            <div style={{marginLeft: '1%'}}>
                <Episodes video={videoDetails}></Episodes>
                <Title level={3}>Recommanded</Title>
                <br />
                <Row gutter={24}>
                        {relatedTalks?.map((video: talksInterface, index: number)=>{
                            // Don'tchange atag to Link.
                            return <Col key={index} span={4}  xs={12} sm={matches ? 4: 12}> 
                                <a href={`/videos/${video?.category}/${video?.id}`}>
                                <Row gutter={24}>
                                    <Col span={6}  xs={6} sm={6} style={styles.card}>
                                        <Image style={matches ? styles.relatedVideosImage: styles.relatedVideosImageMobile} src={video?.thumbnail} alt={video?.title}/>
                                    </Col>
                                    {/* <Col span={24}  xs={12} sm={12} style={styles.card}>
                                        <Typography.Text strong>{video?.title}</Typography.Text>
                                        <br />
                                        <Typography.Text>{video?.channelTitle} <CheckCircleOutlined /></Typography.Text>
                                        <br />
                                        <Typography.Text>{video?.views} views | {dayjs(video?.publishedAt).format('MMM YYYY')}</Typography.Text>
                                    </Col> */}
                                </Row>
                                </a>
                                </Col>
                        })}            
                        </Row>                            
                <Row gutter={24}>
                    <Comments></Comments>
                </Row>
            </div>
        </>
    );
};
