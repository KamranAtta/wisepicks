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
    const [sourceLink, setSourceLink] = useState<any>();
    const [loader, setLoader] = useState<boolean>(false);
  
    const getFixtureFrame = async ()=> {
      setLoader(true);
      const website = 'freesport';
      console.log('props:', fixture);
      const links = fixture?.game?.streamerLinks;
      for (const item of links) {
        if (item.website.trim() === website) {
          console.log('sourceLink11111:', item.websiteLink);
          setSourceLink(item.websiteLink);
          break;
        }
      }
      // Return a default value if the ID is not found
      // let teamA: string | undefined;
      // let teamB: string | undefined;
      // console.log('PROPS:::', props);
  
      // const response: any = await getIframe({ teamA: teamA, teamB: teamB});
      // setIframe(response.data);
      setLoader(false);
    }
  
    useEffect(() => {
      getFixtureFrame();
    }, []);
  
    return (
      <>
      {
        matches ?
          <iframe frame-border="0" margin-height="0" margin-width="0" src={sourceLink} allow-fullscreen="yes" scrolling="yes" width="1300" height="650"></iframe>
        :
          <iframe frame-border="0" margin-height="0" margin-width="0" src={sourceLink} allow-fullscreen="yes" scrolling="yes" width="-webkit-fill-available" height="auto"></iframe>
      }
      {loader ? <Loader /> : <></>}
      </>
    );
  }
  