/* eslint-disable camelcase */
import {
  Row,
  Col,
  Card,
} from 'antd';
import TypographyTitle from '../../common/Title';
import TypographyText from '../../common/Text';
import ButtonLayout from '../../../components/ButtonLayout';
import {
  HourglassOutlined,
  InfoCircleOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import './index.css';

export default function ProjectResourcesTable() {

  const cardStyle = {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '100%',
  };

  const iconStyle = {
    color: '#adc6ff',
    marginLeft: '10px',
    fontSize: '21px',
    strokeWidth: '15px',
  };

  return (
    <>
      <div>
        <ButtonLayout
          title={
            <TypographyTitle level={3} style={{ marginTop: '0px', marginBottom: '0px' }}>
              Project Details
            </TypographyTitle>
          }
          left={[]}
          right={[]}
        />
        <Row gutter={16}>
          {/* First Card */}
          <Col span={8}>
            <Card
              size='small'
              title={
                <span>
                  {'Info'}
                  <InfoCircleOutlined style={iconStyle} />
                </span>
              }
              style={cardStyle}
            >
              <div style={{ padding: '0px' }}>
                <p>
                  Project Name: <strong>Client Name</strong>{' '}
                </p>
                <p>
                  {' '}
                  Project: <strong>Project Name</strong>{' '}
                </p>
              </div>
            </Card>
          </Col>

          {/* Second Card */}
          <Col span={8}>
            <Card
              size='small'
              title={
                <span>
                  {'Timeline'}
                  <ScheduleOutlined style={iconStyle} />
                </span>
              }
              style={cardStyle}
            >
              <p>
                Start Date: <strong>203-12-22</strong>{' '}
              </p>
              <p>
                End Date: <strong>2023-02-20</strong>{' '}
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              size='small'
              title={
                <span>
                  {'Time Remaining'}
                  <HourglassOutlined style={iconStyle} />
                </span>
              }
              style={cardStyle}
            >
              <TypographyText>
                <strong>2 hours</strong>
              </TypographyText>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
