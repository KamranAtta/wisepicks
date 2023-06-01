import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { MenuOutlined } from '@ant-design/icons';
import { customTheme } from '../../theme';

const { Header } = Layout;

export default function HeaderComponent() {
  const matches = useMediaQuery('(min-width: 830px)');
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        borderBottom: 'solid 1px #e8e8e8',
        boxShadow: '0 0 30px #f3f1f1',
        gap: '30px',
        justifyContent: matches ? 'flex-start' : 'space-between',
      }}
    >
      <a href=''>
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
          <img src={logo} width={100} />
        </div>
      </a>
      {matches ? (
        <Menu mode='horizontal' defaultSelectedKeys={['2']} style={{ width: '200px' }}>
          <Menu.Item key='resources'>
            <Link to='/resources'>Resources</Link>
          </Menu.Item>
          <Menu.Item key='projects'>
            <Link to='/projects'>Projects</Link>
          </Menu.Item>
        </Menu>
      ) : (
        <div onClick={() => null}>
          <MenuOutlined style={{ color: customTheme.token.colorPrimary }} />
        </div>
      )}
    </Header>
  );
}
