import React, { useEffect } from 'react';
import {Row, Col, Card, Image } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import logo from '../../assets/logo/logo.png';
import { styles } from './styles';
import { Link } from 'react-router-dom';
import { talkCategories } from '../../utils/constant';

const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
};

export default function AboutUs({noLogo}: {noLogo: boolean}) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Card title='About Us' style={{ padding: '20px' }}>
            {!noLogo ? <Row gutter={24} style={styles.logo}>
                <Col  span={16}  xs={24} sm={12} md={8} lg={6}>
                    <Image width={300} src={logo} />
                </Col>
            </Row>: <></>}
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='What is InciteTube?' style={styles.card}>
                        <Card.Meta
                        title="A platform for inspirational and Informational videos and talks."
                        />
                        <Paragraph style={styles.paragraph}>
                            Incite tube brings to the table most interesting, valuable, and informational talks by renowened speakers and professional.
                            It provides videos related to Food, livestyle, Future, education, climate change, sports, AI, Psychology, social issues and many more.
                            This platform is to spread awareness about key aspects and most discussed topics which mankind is associated with.
                            A single platform which brings information related to most engaging and necessary topics the society is dealing with.
                            To provide a platform where people can share their thoughts and participate in discussion about the issues faced by mankind.
                            Incite tube is eager to provide recent and upto date information and videos related to most important aspects of human life and society.
                        </Paragraph>
                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Know more about INCITETUBE below' style={styles.card}>
                        <Card.Meta
                        title="A Glimpse of INCITE TUBE Features and service"
                        />
                        <Paragraph style={styles.paragraph}>
                            Our aim to to spread information, to inspire and get inspired, and to build a better world by communicating
                            issues faced by our society. To be a better human, we need to spread positivity and break the silence about issues
                            like climate change and society.
                        </Paragraph>
                        <Paragraph>
                            Incite tube will provide its users with a platform where they can watch inspirational and informative contents.
                            Our video library will choose videos and information content available on internet and will try to make it available to people 
                            beyond the borders and social barriers.

                        </Paragraph>
                        <Paragraph>
                            In a nutshell, the internet today is crowded with information and people find it difficult to find relevent information
                            about social and societal issues. Thus, Incite tube will provide informational videos focusing only on key topics like Climate Change,
                            Psychology, Human behavior, Sports and many more. What makes us unique is our selected content related to issues which mankind face today.

                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='How can Incite Tube help you find relevent information?' style={styles.card}>
                        <Paragraph>
                        Following is a list of instruction on how to find relevent content on incite tube:
                        </Paragraph>
                        <Paragraph>
                            Step 1. Browse out website <Link to='/'>INCITE TUBE</Link>.
                        </Paragraph>
                        <Paragraph>
                            Step 2. In the home page will find categories for the videos like Newest talks, Featured talks, Trending talks, Climate Change,AI and Future talks. 
                        </Paragraph>
                        <Paragraph>
                            Step 3. If you want to browser and selected Talk categories, we have about 20 different talk categories like sports talks, climate talks, psychology talks,
                            Society talks, Health and life style talks, personal growth talks, communication talks etc.
                        </Paragraph>
                        <Paragraph>
                            Step 4. You can click on any category listed on the home page to navigate to talk category, where you will find talks related to same category.
                        </Paragraph>
                        <Paragraph>
                            Step 5. You open the video about any topic you like and any video you want to watch. 
                        </Paragraph>
                        <Paragraph>
                            Step 6. There will be space to share what you learned form the video and how the video benefitted you.
                        </Paragraph>
                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Which topic you can watch on INCITE Tube?' style={styles.card}>
                        {talkCategories?.map((cat: string, index: number) => (
                            <Card.Grid key={index} style={gridStyle}>
                            <Link to={'/topic/' + cat} >{cat}</Link>
                            </Card.Grid>
                        ))}
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Newest Ted Talks on INCITE TUBE' style={styles.card}>
                        <Paragraph>
                            This category of videos provide recent video talks on most important topics. This is not specific to any category but
                            most recent videos on ted talk. 
                        </Paragraph>
                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Featured Ted Talks on INCITE TUBE' style={styles.card}>
                        <Paragraph>
                        This is a special ted talks category. It provides most interesting videos related to any topic based on views, 
                        interest level of the video and importance of the video. It is one of the most important categories on ted talks and features videos 
                        which are more prominent.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Trending Ted talks on INCITE TUBE' style={styles.card}>
                        <Paragraph>
                            Trending ted talks on incite tube is one of the most important categories where we focus on selected videos which are on trending.
                            It is most engaging and significant ted talk category and people seem to prefer this category very much.
                        </Paragraph>
                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Climate Change, AI and Future' style={styles.card}>
                        <Paragraph>
                             AI and Future ted talks is one of the most interesting and exciting ted video category on incite tube. It contain all the videos
                            which are recently added to the web on AI and Future. This topic is very essential, and contains information which 
                            erveryone does not want to avoid. 
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Climate Change' style={styles.card}>
                    <Paragraph>
                            Climate change Ted talks on incite tube is most important category on INCITE TUBE. It brings information and awareness among people.
                            The aim of INCITE TUBE falls within this category. Incite Tube aims to create awareness and Climate change talks help us spread awareness
                            among people about the future if this very earth we are living in.
                        </Paragraph>
                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='INCITE TUBE: Inspire or get Inspired' style={styles.card}>
                        <Paragraph>
                            Our mission is to spread awareness about most important issues mankind faces today. Incite tube provides
                            ted talks highlighting these issues. In out platform you can share your ideas and can inspire people.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Lets discuss about issues like Climate Change' style={styles.card}>
                        <Paragraph>
                            Incite Tube is a platform where you can find new ted talk videos and burning topics of present time. Not only that, you can 
                            also share your thoughts about a topic or a video and inspire or get inspired. Our discussion forum provides an
                            opportunity to participate in a discussion about a partucular topic of your interest.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={24}  xs={24} sm={24}>
                    <Card title='Why you should visit INCITE TUBE?' style={styles.card}>
                        <Paragraph>
                            There are multiple reason to choose Incite Tube to watch insprational and informative videos.
                         </Paragraph>
                        <Paragraph>
                            Incite Tube filters ted Talks based on special categories and brings most important and recent videos available on Ted Talk.
                        </Paragraph>
                        <Paragraph>
                            It selects videos based on total views, trends and features.
                        </Paragraph>
                        <Paragraph>
                            Its a platform where you can find most recent ted talks on Climate change. 
                        </Paragraph>
                        <Paragraph>
                            It provide most recent ted talks on AI and Future.
                        </Paragraph>
                        <Paragraph>
                            It provides most recent ted talks on Psychology, humanity, sports etc.
                        </Paragraph>
                        <Paragraph>
                            The content of INCITE TUBE is up to date and it not flooded with irrelevent videos. It has most up to date and recent Ted videos.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};