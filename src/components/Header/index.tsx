import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ConfigProvider, Layout } from 'antd';

import Menu from '../common/Menu';
import MenuItem from '../common/MenuItem';
import logo from '../../assets/logo/logo.png';
import DrawerComponent from '../common/Drawer';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { ConfigConsumerProps } from 'antd/lib/config-provider';
// import { useAuth } from '../../context/AuthContext';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const { Header } = Layout;

const styles = {
  headerHamburger: (themeConfig: ConfigConsumerProps) => ({
    color: themeConfig?.theme?.token?.colorPrimary,
  }),
  headerDrawer: {
    width: 'auto',
    borderRight: 'none',
  },
};

export default function HeaderComponent() {
  const themeConfiguration = useContext(ConfigProvider.ConfigContext);
  const [headerDrawerOpen, setHeaderDrawerOpen] = useState<boolean>(false);
  const matches = useMediaQuery('(min-width: 830px)');
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const MenuItems = (
    <>
      <MenuItem key='resources'>
        <Link to='/resources'>Resources</Link>
      </MenuItem>
      <MenuItem key='projects'>
        <Link to='/projects'>Projects</Link>
      </MenuItem>
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
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          borderBottom: 'solid 1px #e8e8e8',
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
            <MenuOutlined style={styles.headerHamburger(themeConfiguration)} />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', background: 'white' }}>
        {!user ? (
          ''
        ) : (
          <LogoutOutlined
            onClick={logout}
            style={{ fontSize: '18px', color: '#dc6962', cursor: 'pointer' }}
          />
        )}
      </div>
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
