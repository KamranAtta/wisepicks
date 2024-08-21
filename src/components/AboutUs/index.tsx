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
                        title="Your Source for Free Movies and Series."
                    />
                    <Paragraph style={styles.paragraph}>
                        Incite Tube offers an extensive library of free movies and series across various genres. 
                        From thrilling dramas to lighthearted comedies, our platform provides unlimited entertainment for everyone. 
                        We are committed to bringing you the latest releases as well as timeless classics, ensuring a diverse selection that caters to all tastes. 
                        Incite Tube is your go-to destination for seamless streaming and a great viewing experience, anytime and anywhere.
                    </Paragraph>

                    </Card>
                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='Know more about INCITETUBE below' style={styles.card}>
                    <Card.Meta
                        title="Discover the Features and Services of INCITE TUBE"
                    />
                    <Paragraph style={styles.paragraph}>
                        Our mission is to entertain and bring the world closer through movies and series that captivate, inspire, and connect. 
                        We believe in the power of storytelling to bridge gaps, spread positivity, and explore meaningful themes that impact our society.
                    </Paragraph>
                    <Paragraph>
                        Incite Tube offers a diverse collection of free movies and series, carefully curated to provide endless entertainment for users worldwide. 
                        We aim to break barriers and bring quality content that resonates with people, regardless of borders or backgrounds.
                    </Paragraph>
                    <Paragraph>
                        In a nutshell, the entertainment landscape today is vast and overwhelming, making it hard to find what truly speaks to you. 
                        Incite Tube stands out by offering a unique selection of movies and series focused on themes like human connection, social issues, and personal growth—stories that reflect the world we live in and the challenges we face.
                    </Paragraph>

                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col  span={12}  xs={24} sm={12}>
                    <Card title='How Can Incite Tube Help You Find Relevant Content?' style={styles.card}>
                        <Paragraph>
                            Here is a step-by-step guide to help you find the right movies and series on Incite Tube:
                        </Paragraph>
                        <Paragraph>
                            Step 1. Visit our website <Link to='/'>INCITE TUBE</Link>.
                        </Paragraph>
                        <Paragraph>
                            Step 2. On the home page, you will find categories such as New Releases, Featured Movies, Trending Series, and more.
                        </Paragraph>
                        <Paragraph>
                            Step 3. If you are looking to browse specific genres, we offer around 20 different categories including Action, Drama, Comedy, Thriller, Documentary, Romance, Sci-Fi, and more.
                        </Paragraph>
                        <Paragraph>
                            Step 4. Click on any category on the home page to explore content related to that genre or theme.
                        </Paragraph>
                        <Paragraph>
                            Step 5. Select and watch any movie or series that catches your interest, all free of charge.
                        </Paragraph>
                        <Paragraph>
                            Step 6. Feel free to share your thoughts, reviews, or favorite moments with the community after watching.
                        </Paragraph>
                    </Card>

                </Col>
                <Col  span={12}  xs={24} sm={12}>
                    {
                        talkCategories?.map((item: any, indexx: number) => (
                            <Row key={indexx} gutter={24}>
                                <Card title={item?.title} style={styles.card}>
                                    {item?.categories?.map((cat: any, index: number) => (
                                        <Card.Grid key={index} style={gridStyle}>
                                        <Link to={'/videos/' + cat} >{cat}</Link>
                                        </Card.Grid>
                                    ))}
                                </Card>
                            </Row>
                        ))
                    }
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12} xs={24} sm={12}>
                    <Card title='Newest Movies and Shows on INCITE TUBE' style={styles.card}>
                        <Paragraph>
                            This category features the latest movies and series added to our platform. It includes the most recent releases, offering fresh content across a variety of genres.
                        </Paragraph>
                    </Card>
                </Col>
                <Col span={12} xs={24} sm={12}>
                    <Card title='Featured Movies and Shows on INCITE TUBE' style={styles.card}>
                        <Paragraph>
                            This special category highlights the most popular movies and series. Content is selected based on views, audience engagement, and overall impact, making it a must-watch for all users.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12} xs={24} sm={12}>
                    <Card title='Trending Movies and Series on INCITE TUBE' style={styles.card}>
                        <Paragraph>
                            The Trending category on Incite Tube showcases the most popular and engaging movies and series currently captivating audiences. This is one of our most visited sections, offering content that everyone is talking about.
                        </Paragraph>
                    </Card>
                </Col>
                <Col span={12} xs={24} sm={12}>
                    <Card title='Climate Change, AI, and The Future' style={styles.card}>
                        <Paragraph>
                            Our Climate Change, AI, and The Future category features thought-provoking films and documentaries covering these crucial topics. It offers the latest content that explores the impact of technology and climate change on our world, making it essential viewing for anyone looking to stay informed about these important issues.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12} xs={24} sm={12}>
                    <Card title='Movie Trailers' style={styles.card}>
                        <Paragraph>
                            Discover the latest movie trailers on Incite Tube. Stay up-to-date with previews of upcoming films, giving you a sneak peek into the hottest releases before they hit the screen. Whether you are into blockbusters or indie gems, we have got the trailers that will get you excited for what is to come.
                        </Paragraph>
                    </Card>
                </Col>
                <Col span={12} xs={24} sm={12}>
                    <Card title='Latest Movies' style={styles.card}>
                        <Paragraph>
                            Explore our collection of the latest movies added to Incite Tube. From action-packed adventures to heartwarming dramas, our platform brings you fresh releases across all genres. Stay entertained with our constantly updated movie library, offering something for every movie lover.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12} xs={24} sm={12}>
                    <Card title='Latest Series' style={styles.card}>
                        <Paragraph>
                            Catch the newest series on Incite Tube, featuring episodes from the most talked-about shows. Whether you are into binge-worthy dramas, thrilling mysteries, or laugh-out-loud comedies, our platform provides the latest episodes as soon as they become available. Stay ahead of the curve and never miss out on the latest TV trends.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

        </Card>
    );
};