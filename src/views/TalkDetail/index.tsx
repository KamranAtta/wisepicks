import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Image, Typography, Tag } from 'antd';
import {  useParams } from 'react-router-dom';
import { getTedTalksById } from '../../apis/fixture.api';
import Loader from '../../components/common/Loader';
import VideoPlayer from '../VideoPlayer';
import { talksInterface } from '../interfaces';
import Title from 'antd/es/typography/Title';
import { styles } from '../../styles';
import dayjs from 'dayjs';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { CheckCircleOutlined } from '@ant-design/icons';
import Comments from '../Comments';

export default function TalkDetail() {
    const { categoryName, id } = useParams();
    const matches = useMediaQuery('(min-width: 1000px)');
    const [videoDetails, setVideoDetails] = useState<talksInterface>();
    const [relatedTalks, setRelatedTalks] = useState<talksInterface[]>([]);
    const [loader, setLoader] = useState<boolean>(false);

    const getVideodetails = async () => {
        setLoader(true);
        const response = await getTedTalksById({id: id, category: categoryName});
        setVideoDetails(response?.data?.talk);
        setRelatedTalks(response?.data?.relatedTalks);
        setLoader(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getVideodetails();
    }, [id]);

    return (
        <Row gutter={24} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px', paddingTop:'10px'}}>
            <Col span={22}>
                <Row gutter={24}>
                    <Col span={15}  xs={24} sm={15} style={styles.card}>
                        <div style={{height: matches ? '500px': '200px', background: 'black'}}>
                            <VideoPlayer videoId={videoDetails?.videoId}></VideoPlayer>
                        </div>
                        <Divider></Divider>
                        <Row>
                            <Typography.Title level={matches ? 2 : 4}>{videoDetails?.title}</Typography.Title>
                            <p style={{fontSize: '1rem'}}>{videoDetails?.description}</p>
                            <br />
                            <Typography.Text>{videoDetails?.views} Views since {dayjs(videoDetails?.publishedAt).format('MMM YYYY')}</Typography.Text>
                            <Row>
                                {videoDetails?.tags?.map((tag: string, index: number)=>{
                                    return <Tag key={index} style={styles.Tag}>#{tag}</Tag>
                                })}
                            </Row>
                        </Row>
                        <Comments></Comments>
                    </Col>
                    <Col span={8}  xs={24} sm={8} style={styles.card}>
                        <Title level={3}>Watch Next</Title>
                        <br />
                        {relatedTalks?.map((video: talksInterface, index: number)=>{
                            // Don'tchange atag to Link.
                            return <a key={index} href={`/talks/${video?.category}/${video?.id}`} style={{display: 'flex'}}>
                                <Row gutter={24}>
                                    <Col span={24}  xs={12} sm={12} style={styles.card}>
                                        <Image style={matches ? styles.relatedVideosImage: styles.relatedVideosImageMobile} src={video?.thumbnail} alt={video?.title}/>
                                    </Col>
                                    <Col span={24}  xs={12} sm={12} style={styles.card}>
                                        <Typography.Text strong>{video?.title}</Typography.Text>
                                        <br />
                                        <Typography.Text>{video?.channelTitle} <CheckCircleOutlined /></Typography.Text>
                                        <br />
                                        <Typography.Text>{video?.views} views | {dayjs(video?.publishedAt).format('MMM YYYY')}</Typography.Text>
                                    </Col>
                                </Row>
                            </a>
                        })}
                    </Col>
                </Row>
            </Col>
            {loader ? <Loader /> : <></>}
        </Row>
    );
};
