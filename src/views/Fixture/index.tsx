/* eslint-disable camelcase */
import {
    Row,
    Col,
    Table
  } from 'antd';

import './index.css'
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { getFixtureByName, getStreamLinks } from '../../apis/fixture.api';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import { useParams } from 'react-router-dom';
import TypographyTitle from '../../components/common/Title';
import { getTimeDifference } from '../../utils/timeDifference';

  export default  function  Fixture() {
    const matches = useMediaQuery('(min-width: 1000px)');
    const [fixture, setFixture] = useState<any>({});
    const [streams, setStreams] = useState<any>([]);
    const { teams } = useParams();
    const [loader, setLoader] = useState<boolean>(false);
    const [timer, setTimer] = useState<string>('');
    const [parserRunning, setParserRunning] = useState<boolean>(false)
    
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
      populateStreams(streamsObj);
      setLoader(false);
    }

    const populateStreams = async (links: any)=> {
      setLoader(true);

      if(links.length > 0){
        const streamsList = links.map((item: any)=>{
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

    const countdownInterval = async () =>{
      setInterval(async () => {
        const timeDifference = await getTimeDifference(fixture?.game?.matchTime, fixture?.game?.matchDate);
        let timerr = '';
        if (timeDifference < 0) {
          if((timeDifference + 10800000) < 0 ) {
            timerr = 'FULL TIME';
            setTimer('FULL TIME');
          }else {
            if(fixture?.game?.streamerLinks?.length < 1) {
              if(!parserRunning){
                setParserRunning(true);
                setLoader(true);
                const links = await getStreamLinks(fixture);
                fixture.game.streamerLinks = links.data;
                setStreams(fixture);
                populateStreams(links.data);
                setLoader(false);
                setParserRunning(false);
                setTimer('LIVE');
              }
            }else {
              setTimer('LIVE');
            }
          }
        } else {
          if(fixture?.game?.streamerLinks?.length < 1) {
            if(timerr != 'LIVE'){
              const seconds = Math.floor((timeDifference / 1000) % 60);
              const m = Math.floor((timeDifference / (1000 * 60)) % 60);
              const h = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
              const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
              const dys = days > 0 ?  `${days} day(s), ` : '';
              const hrs = h > 0 ?  `${h} hour(s), ` : '';
              const mins = m > 0 ?  `${m} minute(s), ` : '';
              const secs = seconds > 0 ?  `${seconds} second(s) ` : '';
            
              timerr = `${dys} ${hrs} ${mins} ${secs} `;
              setTimer(timerr);
              if(!timerr.includes('hour(s)')){
                if(timerr != 'FULL TIME'){
                  if(timerr === 'LIVE') {
                    if(!parserRunning){
                      setParserRunning(true);
                      const links = await getStreamLinks(fixture);
                      fixture.game.streamerLinks = links.data;
                      populateStreams(links.data);
                      setFixture(fixture);
                      setLoader(false);
                      setParserRunning(false);
                    }
                  }else{
                    const secInterval = [0, 15, 30, 45, 59];
                    if(m < 55 && secInterval.includes(seconds)){
                      if(!parserRunning){
                        setLoader(true);
                        setParserRunning(true);
                        const links = await getStreamLinks(fixture);
                        fixture.game.streamerLinks = links.data;
                        setFixture(fixture);
                        populateStreams(links.data);
                        setLoader(false);
                        setParserRunning(false);
                      }
                    }
                  }
                }
              }
            } else {
                setParserRunning(true);
                setLoader(true);
                const links = await getStreamLinks(fixture);
                fixture.game.streamerLinks =  links.data;
                setFixture(fixture);
                setLoader(false);
                setParserRunning(false);
              // }
            }
          }
        }
      }, 10000);
    }
  
    useEffect(() => {
      getFixture();
    }, [teams]);

    useEffect(() => {
      countdownInterval();
    }, [fixture]);
  
    return (
      <>
      {
        matches ?
        <div style={{padding:'2rem', textAlign:'center', background: 'rgb(46 44 44 / 68%)', marginBottom: '5px'} }>
          <Row>
            <Col span={6}>
                <Col>
                <img src={fixture?.game?.teamAImage } alt={fixture?.game?.teamA } />
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
              <TypographyTitle level={5}>
                <p style={{color: '#ffffff'}}>{timer}</p>
              </TypographyTitle> 
            </Col>
            <Col span={6}>
                <Col>
                <img style={{width: '100px', textAlign: 'center'}} src={fixture?.game?.teamBImage} alt={fixture?.game?.teamB} />
                </Col>
                <Col>
                <p>{fixture?.game?.teamB}</p>
                </Col>
            </Col>
          </Row>
          { 
            fixture?.game?.streamerLinks.length < 1 && timer != 'FULL TIME' ?        
            <TypographyTitle style={{display: 'flex', justifyContent: 'space-around', textAlign:'center', background: 'rgb(46 44 44 / 68%)'}} level={5}>
            <p style={{color: '#000000'}}> LINKS WILL BE AVAILABLE 1 HOUR BEFORE THE MATCH STARTS, STAY TUNED!</p>
            </TypographyTitle>:
            <></>
          }
        </div>:
        <div style={{ display: 'list-item', justifyContent: 'space-between', padding: '1rem', textAlign:'center', background: 'rgb(46 44 44 / 68%)', marginBottom: '5px'}}>
          <Row style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Col>
              <Row><img style={{width: '40px', textAlign: 'center'}} src={fixture?.game?.teamAImage} alt={fixture?.game?.teamA} /></Row>
              <Row><p>{fixture?.game?.teamA}</p></Row>
            </Col>
            <Col>
              <TypographyTitle level={5}>
              <p style={{color: '#ffffff'}}>{timer}</p>
              </TypographyTitle>         
            </Col>
            <Col>
              <Row><img style={{width: '40px', textAlign: 'center'}} src={fixture?.game?.teamBImage} alt={fixture?.game?.teamB} /></Row>
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
  