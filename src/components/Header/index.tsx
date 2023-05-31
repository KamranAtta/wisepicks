import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
const { Header } = Layout;

export default function HeaderComponent() {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        borderBottom: 'solid 1px #e8e8e8',
        boxShadow: '0 0 30px #f3f1f1',
        gap: '30px',
      }}
    >
      <a href=''>
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
          <img src={logo} width={100} />
        </div>
      </a>
      <Menu mode='horizontal' defaultSelectedKeys={['2']} style={{ width: '200px' }}>
        <Menu.Item key='resources'>
          <Link to='/resources'>Resources</Link>
        </Menu.Item>
        <Menu.Item key='projects'>
          <Link to='/projects'>Projects</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}
