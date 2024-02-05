import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { getStandings } from '../../apis/fixture.api';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import { Card, Col, Row, Table } from 'antd';
import { styles } from '../../styles';

export default  function  Standings() {
const matches = useMediaQuery('(min-width: 1000px)');
const [standings, setStandings] = useState<any>([]);
const [loader, setLoader] = useState<boolean>(false);

const columns = [
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: 'Team',
        dataIndex: 'team',
        key: 'team',
    },
    {
        title: 'Matches',
        dataIndex: 'matches',
        key: 'matches',
    },
    {
        title: 'Wins',
        dataIndex: 'wins',
        key: 'wins',
    },
    {
        title: 'Losses',
        dataIndex: 'losses',
        key: 'losses',
    },
    {
        title: 'Draws',
        dataIndex: 'draws',
        key: 'draws',
    },
    {
        title: 'Points',
        dataIndex: 'points',
        key: 'points',
    },
];

const mobileColumns = [
    {
        title: 'Team',
        dataIndex: 'team',
        key: 'team',
    },
    {
        title: 'P',
        dataIndex: 'matches',
        key: 'matches',
    },
    {
        title: 'W',
        dataIndex: 'wins',
        key: 'wins',
    },
    {
        title: 'L',
        dataIndex: 'losses',
        key: 'losses',
    },
    {
        title: 'P',
        dataIndex: 'points',
        key: 'points',
    },
];

const standingColumns = matches ? columns: mobileColumns;

const getPointsTable = async ()=> {
    setLoader(true);
    const response = await getStandings({});
    setStandings(response?.data[0]);
    setLoader(false);
}

useEffect(() => {
    getPointsTable();
}, []);

return (
    <Card title='Point Tables'>
        <Row gutter={24}>
            <Col  span={12}  xs={12} sm={12}>
                <Card title='Premier League' style={styles.card}>
                    <Table dataSource={standings['Premier League']} columns={standingColumns} />;
                </Card>
            </Col>

            <Col  span={12}  xs={12} sm={12}>
                <Card title='Bundesliga' style={styles.card}>
                    <Table dataSource={standings['Bundesliga']} columns={standingColumns} />;
                </Card>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col  span={12}  xs={12} sm={12}>
                <Card title='Serie A' style={styles.card}>
                    <Table dataSource={standings['Serie A']} columns={standingColumns} />;
                </Card>
            </Col>

            <Col  span={12}  xs={12} sm={12}>
                <Card title='LaLiga' style={styles.card}>
                    <Table dataSource={standings['LaLiga']} columns={standingColumns} />;
                </Card>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col  span={12}  xs={12} sm={12}>
                <Card title='Ligue 1'style={styles.card}>
                    <Table dataSource={standings['Ligue 1']} columns={standingColumns} />;
                </Card>
            </Col>
        </Row>
        {loader ? <Loader /> : <></>}
    </Card>
);
}
  