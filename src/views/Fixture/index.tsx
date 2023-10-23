/* eslint-disable camelcase */
import {
    Row,
    Col,
    Table,
    // Card,
    // Space,
    // Button,
  } from 'antd';
// import TypographyTitle from '../../components/common/Title';
//   import {
//     InfoCircleOutlined,
//   } from '@ant-design/icons';
import './index.css'
//   import { Link, useParams } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { getFixtureByName } from '../../apis/fixture.api';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import { useParams } from 'react-router-dom';
import TypographyTitle from '../../components/common/Title';

  export default  function  Fixture() {
    const matches = useMediaQuery('(min-width: 1000px)');
    const [fixture, setFixture] = useState<any>({});
    const [streams, setStreams] = useState<any>([]);
    const { teams } = useParams();
    const [loader, setLoader] = useState<boolean>(false);
    
    const columns = [
      {
        title: 'Streamer',
        dataIndex: 'streamer',
        key: 'streamer',
      },
      {
        title: 'Channel',
        dataIndex: 'channel',
        key: 'channel',
      },
      {
        title: 'Language',
        dataIndex: 'language',
        key: 'language',
      },
      {
        title: 'Cross-platform',
        dataIndex: 'crossPlatform',
        key: 'crossPlatform',
      },
      {
        title: 'Quality',
        dataIndex: 'quality',
        key: 'quality',
      },
      {
        title: 'Link',
        dataIndex: 'link',
        key: 'link',
        render: (text: any) => (
          <a href={text} target="_blank" rel="noopener noreferrer">
            Live
          </a>
        ),
      },
    ];

    const mobilColumns = [
      {
        title: 'Streamer',
        dataIndex: 'streamer',
        key: 'streamer',
      },
      {
        title: 'Channel',
        dataIndex: 'channel',
        key: 'channel',
      },
      {
        title: 'Language',
        dataIndex: 'language',
        key: 'language',
      },
      {
        title: 'Link',
        dataIndex: 'link',
        key: 'link',
        render: (text: any) => (
          <a href={text} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        ),
      },
    ];
  
    const getFixture = async ()=> {
      setLoader(true);
      let teamA: string | undefined = teams;
      let teamB: string | undefined = '';
      if(teamA && teamA.includes('-vs-')){
        const teamsArr = teamA.split('-vs-');
        teamA = teamsArr[0];
        teamB = teamsArr[1];
      }
  
      const response: any = await getFixtureByName({ teamA: teamA, teamB: teamB});
      const streamsObj = response?.data?.game?.streamerLinks;
      setFixture(response.data);
      if(streamsObj.length > 0){
        const streamsList = streamsObj.map((item: any)=>{
          return {
            streamer: item?.streamer,
            channel: item?.website,
            language: item?.language,
            crossPlatform: item?.mobileSupport,
            quality: 'HD',
            link: item?.websiteLink,
          }
        });
        setStreams(streamsList);
      }
      setLoader(false);
    }
  
    useEffect(() => {
      getFixture();
    }, [teams]);
  
    return (
      <>{
        matches ?
        <div style={{padding:'2rem', textAlign:'center', background: 'rgb(46 44 44 / 68%)', marginBottom: '5px'} }>
          <Row>
                <Col span={6}>
                    <Col>
                    <img src={fixture?.game?.teamAImage } alt="" />
                    </Col>
                    <Col>
                    <p>
                        {fixture?.game?.teamB ? fixture?.game?.teamA: ''}
                    </p>
                    </Col>
                </Col>
                <Col span={12}>
                  <TypographyTitle level={3}>
                  <p className='category-name'>{fixture?.subCategoryName}</p>
                  </TypographyTitle>

                  {!fixture?.game?.teamB ?
                    <TypographyTitle level={5}>
                    <p>{fixture?.game?.teamA}</p>
                    </TypographyTitle>: ''
                  }

                  <TypographyTitle level={5}>
                  <p className='category-name'>{fixture?.game?.teamB ? fixture?.game?.matchTime: fixture?.game?.matchDate}</p>
                  </TypographyTitle>
                </Col>
                <Col span={6}>
                    <Col>
                    <img style={{width: '100px', textAlign: 'center'}} src={fixture?.game?.teamBImage} alt="" />
                    </Col>
                    <Col>
                    <p>{fixture?.game?.teamB}</p>
                    </Col>
                </Col>
          </Row>
          { 
            fixture?.game?.streamerLinks.length < 1 ?        
            <TypographyTitle style={{display: 'flex', justifyContent: 'space-around', textAlign:'center', background: 'rgb(46 44 44 / 68%)'}} level={5}>
            <p style={{color: '#000000'}}> LINKS WILL BE AVAILABLE 1 HOUR BEFORE THE MATCH STARTS, STAY TUNED!</p>
            </TypographyTitle>:
            <></>
          }
        </div>:
        <div style={{ display: 'list-item', justifyContent: 'space-between', padding: '1rem', textAlign:'center', background: 'rgb(46 44 44 / 68%)', marginBottom: '5px'}}>
          <Row style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Col>
              <Row><img style={{width: '40px', textAlign: 'center'}} src={fixture?.game?.teamAImage} alt="" /></Row>
              <Row><p>{fixture?.game?.teamA}</p></Row>
            </Col>
            <Col>          
              <TypographyTitle level={5}>
              <p style={{color: '#ffffff'}}>{fixture?.game?.teamB ? fixture?.game?.matchTime: fixture?.game?.matchDate}</p>
              </TypographyTitle>            
            </Col>
            <Col>
              <Row><img style={{width: '40px', textAlign: 'center'}} src={fixture?.game?.teamBImage} alt="" /></Row>
              <Row><p>{fixture?.game?.teamB}</p></Row>
            </Col>
          </Row>
          {
            fixture?.game?.streamerLinks.length < 1 ?
            <Row style={{display: 'flex', justifyContent: 'space-around', textAlign:'center', background: 'rgb(46 44 44 / 68%)'}}>
              <Col>          
                <TypographyTitle level={5}>
                <p style={{color: '#000000'}}> LINKS WILL BE AVAILABLE 1 HOUR BEFORE THE MATCH STARTS, STAY TUNED!</p>
                </TypographyTitle>            
              </Col>
          </Row>:
          <></>
          }
        </div>
      }
      <Table className='streams-table' dataSource={streams} columns={matches ? columns: mobilColumns} />
      {loader ? <Loader /> : <></>}
      </>
    );
  }
  