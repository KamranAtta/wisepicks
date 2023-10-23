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

const padding = {display: 'flex', paddingRight: '10px' , paddingLeft: '10px', color: 'black', justifyContent:'center'}

export default  function  AssignResource() {
  const matches = useMediaQuery('(min-width: 1000px)');
  const [fixtures, setFixtures] = useState<any>({});
  const { categoryName } = useParams();
  const [loader, setLoader] = useState<boolean>(false);

  const getAllFixtures = async ()=> {
    setLoader(true);
    const categoryObj = categories.find((cat: any) => cat.label === categoryName);
    const category = categoryObj?.value;

    const response: any = await getFixtures({ categoryName: categoryObj ? categoryObj.value : category });
    setFixtures(response.data);
    setLoader(false);
  }

  function SubCategoryCard({ subCategory }: any) {
    return (
      <Row gutter={24} style={{ marginBottom: '8px', justifyContent:'center'}}>
      {/* First Card */}
        <Col span={6}>
        </Col>
        <Col span={12}>
          <Card
            size='small'
            title={
              <div  style={headerStyle}>
                <span style={{color: '#6a0707', fontSize: '15px', textTransform: 'capitalize'}}>
                <InfoCircleOutlined style={iconStyle} />
                {subCategory?.subCategoryName}
                </span>
              </div>
            }
            style={cardStyle}
          >
          {subCategory?.games?.map((fixture: any, index: any) => (
            <FixtureCard key={index} fixture={fixture} />
          ))
          }
          </Card>
        </Col>
        <Col span={6}>
        </Col>
    </Row>
    );
  }

  function FixtureCard({ fixture }: any) {
    return (
      <div className='fixture-card'>
        <div>
          <Link 
          className='fixture-link' 
          to={fixture?.teamB ? '/fixture/' + fixture.teamA + '-vs-' + fixture.teamB: '/fixture/' + fixture.teamA}
          >
            <div className='flex-display'>
              <p><strong>{fixture.teamA}</strong>{' '}</p>
              {fixture?.teamB ? <span style={padding}>vs</span>: ''}
              <p><strong>{fixture.teamB}</strong>{' '}</p>
            </div>
          </Link>
        </div>
        <p>
          <Link 
          className='match-time' 
          to={fixture?.teamB ? '/fixture/' + fixture.teamA + '-vs-' + fixture.teamB: '/fixture/' + fixture.teamA}
          >
            <strong>{fixture.matchDate.split('2023')[1]}
            </strong>
          </Link>
        </p>
      </div>
    );
  }

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
              <Button style={{ backgroundColor: '#bbc0c4' }} shape="round" size={'large'}>
                Yesterday
              </Button>
              <Button style={{ backgroundColor: '#5AB3BB' }} shape="round" size={'large'}>
                Today
              </Button>
              <Button style={{ backgroundColor: '#bbc0c4' }} shape="round" size={'large'}>
                Tomorrow
              </Button>
            </Space>
          </Row>
          {fixtures?.subCategories?.map((subCategory: any, index: any) => (
            <SubCategoryCard key={index} subCategory={subCategory} />
          ))}
      </div>
      {loader ? <Loader /> : <></>}
    </>
  );
}
