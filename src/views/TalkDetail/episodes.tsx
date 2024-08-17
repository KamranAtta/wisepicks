import React from 'react';
import {  Card, Col, Row } from 'antd';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';

// const gridStyle: React.CSSProperties = {
//     width: '23%',
//     textAlign: 'center',
//     borderRadius: '5px'
//   };

export default function Episodes(data:any) {
    // const [loader, setLoader] = useState<boolean>(false);
    const matches = useMediaQuery('(min-width: 768px)');

    // const updateIframeURL = (video: any) => {
        // onClick={() => updateIframeURL(video)}
    //     alert()
    //   }

  return (
    <>
        <Card 
        title={data?.video?.title}
        className='episodes'
        >
            <Row gutter={24} >
            {data?.video?.episodes?.map((video: any, index: number)=> {
            return <Col key={index} span={6} xs={matches ? 24: 6} sm={matches ? 6: 12}>
                <p key={index} className={matches ? 'grid-style': 'grid-style-mobile'}>
                {`Episode ${data?.video?.episodes?.length - index}`}
                </p>
            </Col>
        })}
            </Row>
        </Card>
        {/* {loader ? <Loader /> : <></>} */}
    </>
  );
};