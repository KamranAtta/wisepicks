import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { styles } from '../../styles';
import { useParams } from 'react-router-dom';
import { getTedTalksById } from '../../apis/fixture.api';
import Loader from '../../components/common/Loader';
import VideoPlayer from '../VideoPlayer';

export default function TalkDetail() {
    const matches = useMediaQuery('(min-width: 830px)');
    const { categoryName, id } = useParams();
    const [videoDetails, setVideoDetails] = useState<any>();
    const [loader, setLoader] = useState<boolean>(false);

    const getVideodetails = async () => {
        setLoader(true);
        const response = await getTedTalksById({id: id, category: categoryName});
        // console.log('Details', response?.data);
        setVideoDetails(response?.data?.talk);
        setLoader(false);
    }

    useEffect(() => {
        getVideodetails();
    }, [id]);

    return (
        <Row gutter={24} style={{display: 'flex', justifyContent: 'center', paddingBottom:'10px', paddingTop:'10px'}}>
            <Col span={22}>
                <Row gutter={24}>
                    <Col span={15}  xs={24} sm={15} style={styles.card}>
                    {/* <div style={{width: '100%', height: '500px',background: 'black'}}> */}
                        <VideoPlayer videoId={videoDetails?.videoId}></VideoPlayer>
                    {/* </div> */}
                    </Col>
                    <Col span={8}  xs={24} sm={8} style={styles.card}>
                        <div>
                            <h1 style={{fontSize: '2.25rem'}}>{videoDetails?.title}</h1>
                            <p style={{fontSize: '1rem'}}>{videoDetails?.description}</p>
                        </div>
                        <Button style={matches ? {...styles.watchButton, position: 'absolute'} : {}}>Watch Now</Button>
                    </Col>
                </Row>
            </Col>
            {loader ? <Loader /> : <></>}
        </Row>
    );
};