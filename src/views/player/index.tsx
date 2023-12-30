/* eslint-disable no-console */
/* eslint-disable camelcase */
// import { Row } from 'antd';

import './index.css'
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
// import { getIframe } from '../../apis/fixture.api';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';

  export default  function  Player({ fixture }: any) {
    const matches = useMediaQuery('(min-width: 1000px)');
    const [sourceLink, setSourceLink] = useState<any>('');
    const [loader, setLoader] = useState<boolean>(false);
  
    const getFixtureFrame = async ()=> {
      setLoader(true);
      const website = 'freesport';
      const links = fixture?.game?.streamerLinks;
      for (const item of links) {
        if (item.website.trim() === 'sheri007' || item.website.trim() === 'enjoyhd') {
          setSourceLink(item.websiteLink);
          break;
        }
        if (!sourceLink && item.website.trim() === website) {
          setSourceLink(item.websiteLink);
        }
      }
      setLoader(false);
      // Return a default value if the ID is not found
      // let teamA: string | undefined;
      // let teamB: string | undefined;
      // console.log('PROPS:::', props);
  
      // const response: any = await getIframe({ teamA: teamA, teamB: teamB});
      // setIframe(response.data);
    }
  
    useEffect(() => {
      console.log('matches',matches);
      getFixtureFrame();
    }, []);
  
    return (
      <>
      {sourceLink &&
        <div className={matches ? 'video-player-container' : 'video-player-container-mobile'}>
        {!sourceLink && <div className='loading-placeholder'>Loading...</div>}
          <iframe frameBorder={0} marginHeight={0} marginWidth={0} height={matches ? '400':'auto'} width={matches ? '800':'auto'} src={sourceLink} allowFullScreen={true} scrolling='yes'></iframe>
          {loader ? <Loader /> : <></>}
        </div>
      }
      </>
    );
  }
  