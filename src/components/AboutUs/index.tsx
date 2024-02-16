import React from 'react';
import {Row, Col, Card, Image } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import logo from '../../assets/logo/logo.png';
import { styles } from './styles';
import { Link } from 'react-router-dom';
import { categories } from '../../utils/constant';

const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
};

interface categoryInterface {
    label: string;
    value: string;
}

export default function AboutUs() {

    return (
        <Card title='About Us' style={{ padding: '20px' }}>
            <Row gutter={24} style={styles.logo}>
                <Col  span={16}  xs={24} sm={12} md={8} lg={6}>
                    <Image width={300} src={logo} />
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='What is Streameast Soccer?' style={styles.card}>
                        <Card.Meta
                        title="An open and known website for live sports updates and free live-streaming."
                        />
                        <Paragraph style={styles.paragraph}>
                            What could be more appealing than having a platform to watch your favorite 
                            sports online uninterruptedly? If you are in search of a streaming service 
                            that is free, then streameast is for you to enjoy the live streaming of 
                            FOOTBALL/SOCCER, NBA, NFL, BOXING, RUGBY, UFC, FORMULA 1, TENNIS and CRICKET. 
                            This is your safest and most secure go-to site to watch sports at your door without 
                            worrying about damaging your electronics.
                        </Paragraph>
                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Who are we? Know more about us below!' style={styles.card}>
                        <Card.Meta
                        title="A Glimpse of Streameast Soccer Sports live streaming Service"
                        />
                        <Paragraph style={styles.paragraph}>
                            Our mission is to provide the best solutions for our customers. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Integer nec odio. Praesent libero.
                        </Paragraph>
                        <Paragraph>
                            Streameast is our streaming service that has been entertaining the enthusiasts of sports for a 
                            year now and will continue to do so for many more years to come. Our service is our pride 
                            because of its high-quality streaming and user satisfaction. Our platform is a highly trusted 
                            platform where you can watch live FOOTBALL, NBA, NHL, UFC, CRICKET, FORMULA, and many more. 
                        </Paragraph>
                        <Paragraph>
                            In a nutshell, this single sports service encompasses a multitude of sports for you to enjoy 
                            in your comfort. To save you time and reduce the stress and hassle of searching various sites 
                            for your favorite sports, we have created this site for you to watch live sports streaming.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='How can Streameast Soccer help you watch uninterrupted live sports for free?' style={styles.card}>
                        <Paragraph>
                        To stream different sports on the website for free, you have to follow the following steps:
                        </Paragraph>
                        <Paragraph>
                            Step 1. Open your Browser and search Streameast Soccer.
                        </Paragraph>
                        <Paragraph>
                            Step 2. Streameast live streams multiple sports at a time on the website, you need to scroll down until you see streaming sports. 
                        </Paragraph>
                        <Paragraph>
                            Step 3. Once you find the sports that you want to watch, click on its icon on the website page. Then you will see all the information related to your favorite sports including the list of events, news, updates, important dates, upcoming matches, etc.
                        </Paragraph>
                        <Paragraph>
                            Step 4. When you click on the events tap, it will take you to a separate page where you will see multiple links related to the event link.
                        </Paragraph>
                        <Paragraph>
                            Step 5. Lastly, click the link for the event you would like to watch. 
                        </Paragraph>
                        <Paragraph>
                            Step 6. Enjoy the live stream of your favorite sports.
                        </Paragraph>
                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Which live Sports streams can be watched at Streameast Soccer?' style={styles.card}>
                        {categories?.map((cat: categoryInterface, index: number) => (
                            <Card.Grid key={index} style={gridStyle}>
                            <Link to={'/streams/' + cat.label} >{cat.label}</Link>
                            </Card.Grid>
                        ))}
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Free Live FOOTBALL/SOCCER Streams' style={styles.card}>
                        <Paragraph>
                            Every important football tournament match is streamed by Streameast from 
                            the English premier league, Bundesliga, Serie A, Ligue 1, MLS, Saudi pro 
                            league to La Liga. You can watch and enjoy all the prominent matches on our 
                            site streameast without interruption. Our streaming service also streams 
                            matches of well-known and major football events i.e., the World Cup, 
                            UEFA Cup, Champions cup, etc.To watch free live soccer and today’s 
                            soccer matches, you can refer to home page of Streameast Soccer.
                        </Paragraph>
                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Live UFC Matches and Live UFC Streams' style={styles.card}>
                        <Paragraph>
                        You can stream the most famous UFC events such as UFC main card on ESPN or another 
                        important event UFC pay-per-view in addition to other UFC fight night events on Streameast Soccer.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Free Live Boxing Streams and Free Live Boxing Matches' style={styles.card}>
                        <Paragraph>
                            The high-quality games of major boxing organizations such as WBA, WBC, or IBF are all available at Streameast Soccer. You can find all the live matches related to Boxing on the home page. 
                            You can enjoy free live streaming of boxing on this platform.
                        </Paragraph>
                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Free live NFL Streams' style={styles.card}>
                        <Paragraph>
                            All sports enthusiasts can access the live stream of NFL 
                            games such as the Super Bowl, regular season games, and exciting playoff matches on our
                            website, Streameast Soccer. Live NFL matches and NFL live streaming is available on the 
                            home page. 
                        </Paragraph>
                        <Paragraph>
                            The NFL final will be played between Kansas City Chiefs vs San Francisco 49ers 
                            on 12 Feb 2024. You can watch live match between Kansas City Chiefs and San Francisco 49ers 
                            on Streameast Soccer for free.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Free Live FORMULA 1 or F1' style={styles.card}>
                        <Paragraph>
                            Streameast streams the F1 World Championship races at no cost. 
                            You can find all the F1 live streams and live F1 Matches on the home page.
                        </Paragraph>
                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Live CRICKET Matches' style={styles.card}>
                        <Paragraph>
                            You can stream all formats of crickets 20/20, One Day, and test matches through streameast.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Free NBA Matches and Live NBA Streams for Free' style={styles.card}>
                        <Paragraph>
                            The exciting playoff matches and awaited regular season matches of basketball can be 
                            streamed on Streameast. 
                            To watch Live NBA and following every match, refer to the home page of Streameast Soccer.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={24}  xs={24} sm={24}>
                    <Card title='Reasons why you should choose Streameast Soccer to watch Live sports streams.' style={styles.card}>
                        <Paragraph>
                            There are multiple reasons why you should go for streameast for streaming and to enjoy your favorite sports at your comfort.
                        </Paragraph>
                        <Paragraph>
                            Streameast is the secure and safest platform to watch sports without worrying about infecting your computer.
                        </Paragraph>
                        <Paragraph>
                            We provide high-quality service and live sports streaming at no cost. You don’t have to empty your pockets to watch your favorite sports.
                        </Paragraph>
                        <Paragraph>
                            Your data and identity are protected at all costs because protecting your privacy is our priority.
                        </Paragraph>
                        <Paragraph>
                            You can enjoy live streams in your comfort using a mobile phone, laptop, or computer without interruption
                        </Paragraph>
                        <Paragraph>
                            You can save time and mental energy. You do not need to search for different websites for different sports streaming; streameast is here! 
                        </Paragraph>
                        <Paragraph>
                            Our goal is to be the best sports streaming platform and to meet the demands of our users by providing a high-quality and uninterrupted sports streaming service.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};