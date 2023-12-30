/* eslint-disable camelcase */
import {
  Row,
  Col,
  Card,
  Space,
  Button,
} from 'antd';
import TypographyTitle from '../../components/common/Title';
import {
  InfoCircleOutlined,
} from '@ant-design/icons';
import './index.css'
import { Link, useParams } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { getFixtures } from '../../apis/fixture.api';
import { useEffect, useState } from 'react';
import { categories } from '../../utils/constant';
import Loader from '../../components/common/Loader';

  const cardStyle = {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '100%',
  };

  const headerStyle: any = {
    display: 'flex',
    justifyContent: 'flex-start',
  };

  const iconStyle = {
    color: '#adc6ff',
    marginRight: '10px',
    fontSize: '21px',
    strokeWidth: '15px',
    alignItems: 'middle'
  };
const adLink = 'https://rooptawu.net/4/6602226';

export default  function  Home() {
  const matches = useMediaQuery('(min-width: 1000px)');
  const [fixtures, setFixtures] = useState<any>({});
  const { categoryName } = useParams();
  const [loader, setLoader] = useState<boolean>(false);
  const notSoccer = ['tennis', 'Cricket', 'F1', 'Boxing'];
  const [adClicked, setAdClicked] = useState<boolean>(false);

  const getAllFixtures = async ()=> {
    setLoader(true);
    const categoryObj = categories.find((cat: any) => cat.label === categoryName);
    const category = categoryObj?.value;

    const response: any = await getFixtures({ categoryName: categoryObj ? categoryObj.value : category });
    setFixtures(response.data);
    setLoader(false);
  }

  const handleClick = async () => {
    setAdClicked(!adClicked)
  }

  function SubCategoryCard({ subCategory }: any) {
    return (
      <Row gutter={24} style={{ marginBottom: '8px', justifyContent:'center'}}>
      {/* First Card */}
        <Col span={4}>
        </Col>
        <Col span={16}>
          <Card
            size='small'
            title={
              <div  style={headerStyle}>
                <span style={{display: 'flex', alignItems: 'center', color: '#6a0707', fontSize: '18px', textTransform: 'capitalize'}}>
                
                { subCategory?.subCategoryImage ? 
                <img style={{width: '20px', paddingRight: '10px'}} 
                src={subCategory?.subCategoryImage} 
                alt={subCategory?.subCategoryName} 
                />: <InfoCircleOutlined style={iconStyle} />}
                {subCategory?.subCategoryName}
                </span>
              </div>
            }
            style={cardStyle}
          >
          {subCategory?.games?.map((fixture: any, index: any) => (
            <FixtureCard key={index} fixture={{...fixture, subCategoryName: subCategory?.subCategoryName}} />
          ))
          }
          </Card>
        </Col>
        <Col span={4}>
        </Col>
    </Row>
    );
  }

  function FixtureCard({ fixture }: any) {
    return (
      <Link 
      onClick={handleClick}
      to={adClicked ? fixture?.teamB ? '/fixture/' + fixture.teamA + '-vs-' + fixture.teamB: '/fixture/' + fixture.teamA: adLink}
      target="_blank" 
      rel="noopener noreferrer"
      >
        <div className='fixture-card'>
          <div className='fixture-link'>
            {/* <Link 
            className='fixture-link' 
            to={fixture?.teamB ? '/fixture/' + fixture.teamA + '-vs-' + fixture.teamB: '/fixture/' + fixture.teamA}
            > */}
              <div className='flex-display'>
                <p className='category'>{!notSoccer.includes(fixture?.subCategoryName) ? 'Soccer': fixture?.subCategoryName} </p>
                <span className='dash'></span>
                <p className='team-name'><strong> {fixture.teamA}</strong>{' '}</p>
                {fixture?.teamB ? <p className='verses'>vs</p>: ''}
                <p className='team-name'><strong>{fixture.teamB}</strong>{' '}</p>
              </div>
            {/* </Link> */}
          </div>
          <p className='match-time'>
            {/* <Link 
            className='match-time' 
            to={fixture?.teamB ? '/fixture/' + fixture.teamA + '-vs-' + fixture.teamB: '/fixture/' + fixture.teamA}
            > */}
              <strong>{fixture?.teamB ? fixture?.matchTime :  fixture.matchDate.split('2023')[1]}
              </strong>
            {/* </Link> */}
          </p>
        </div>
      </Link>
    );
  }

  const handleButtonClick = () => {
    window.open('https://www.buymeacoffee.com/streameast', '_blank');
  };

  useEffect(() => {
    getAllFixtures();
  }, [categoryName]);

  // useEffect(() => {
  //   getAllFixtures();
  // }, []);

  return (
    <>
      <div style={matches ? {padding:'3rem', textAlign:'center', background: '#222121'} : {padding:'5px', textAlign:'center', background: '#222121'} }>
        <TypographyTitle level={3}>
          <p className='category-name'>{fixtures?.categoryName}</p>
        </TypographyTitle>
        <Row className='flex-display'>
            <Space style={{ marginBottom: '15px' }} wrap>
              {/* <Button className='time-button' style={{ backgroundColor: '#bbc0c4' }} shape="round" size={'large'}>
                Yesterday
              </Button> */}
              {/* <Button className='time-button' style={{ backgroundColor: '#5AB3BB' }} shape="round" size={'large'}>
                Streams
              </Button> */}
              <Button onClick={handleButtonClick} className='time-button' style={{ backgroundColor: '#bbc0c4' }} shape="round" size={'large'}>
                Donate
              </Button>
            </Space>
          </Row>
          {fixtures?.subCategories?.map((subCategory: any, index: any) => (
            <SubCategoryCard key={index} subCategory={{...subCategory}} />
          ))}
      </div>
      {loader ? <Loader /> : <></>}
    </>
  );
}
