import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;

export default function HeaderComponent() {
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className='demo-logo'>
        <a href=''>
          <img width={100} />
        </a>
      </div>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']} style={{ width: '200px' }}>
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
