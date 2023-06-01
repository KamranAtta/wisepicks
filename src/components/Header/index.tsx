import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import { customTheme } from '../../theme';
import logo from '../../assets/logo/logo.png';
import DrawerComponent from '../common/Drawer';
import { MenuOutlined } from '@ant-design/icons';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';

const { Header } = Layout;

export default function HeaderComponent() {
  const [headerDrawerOpen, setHeaderDrawerOpen] = useState<boolean>(false);
  const matches = useMediaQuery('(min-width: 830px)');
  const styles = {
    headerDrawer: {
      width: 'auto',
      borderRight: 'none',
    },
  };

  const MenuItems = (
    <>
      <Menu.Item key='resources'>
        <Link to='/resources'>Resources</Link>
      </Menu.Item>
      <Menu.Item key='projects'>
        <Link to='/projects'>Projects</Link>
      </Menu.Item>
    </>
  );

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
          {MenuItems}
        </Menu>
      ) : (
        <div onClick={() => setHeaderDrawerOpen(true)}>
          <MenuOutlined style={{ color: customTheme.token.colorPrimary }} />
        </div>
      )}
      <DrawerComponent
        title='Resource Ally'
        open={headerDrawerOpen}
        onClose={() => setHeaderDrawerOpen(false)}
      >
        {
          <Menu
            onClick={() => setHeaderDrawerOpen(false)}
            mode='vertical'
            defaultSelectedKeys={['2']}
            style={styles.headerDrawer}
          >
            {MenuItems}
          </Menu>
        }
      </DrawerComponent>
    </Header>
  );
}
