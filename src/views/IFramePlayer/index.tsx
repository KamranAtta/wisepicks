import './index.css'
// import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

  export default  function  IFramePlayer({ url }: any) {
    
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    // const matches = useMediaQuery('(min-width: 768px)');

    const updateScreenSize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    useEffect(() => {
      window.scrollTo(0, 0);
      window.addEventListener('resize', updateScreenSize);
      return () => window.removeEventListener('resize', updateScreenSize);
    }, []);
  
    return (
      <>
      {
      url &&
        <Row gutter={24}>
          <Col span={24}>
          {!url && <div className='loading-placeholder'>Loading...</div>}
          <iframe
          title="Video Player"
          width={screenWidth}
          height={screenHeight}
          src={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
          {/* <iframe src={url} allow="autoplay; fullscreen"  frameBorder="no" scrolling="no" style={{width:screenWidth, height: {screenHeight},overflow: 'hidden'}} ></iframe>           */}
          </Col>
        </Row>
      }
      </>
    );
  }
  