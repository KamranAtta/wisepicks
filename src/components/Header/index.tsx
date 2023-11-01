import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ConfigProvider, Layout } from 'antd';
import './index.css'

import Menu from '../common/Menu';
import MenuItem from '../common/MenuItem';
import logo from '../../assets/logo/logo.png';
import DrawerComponent from '../common/Drawer';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { ConfigConsumerProps } from 'antd/lib/config-provider';
import { MenuOutlined } from '@ant-design/icons';
import { categories } from '../../utils/constant';

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
  const matches = useMediaQuery('(min-width: 1000px)');

  const MenuItems = (
    <>
      {categories?.map((cat: any, index: any) => (
      <MenuItem key={index}>
        <Link className='menu-items' to={'/streams/' + cat.label} >{cat.label}</Link>
      </MenuItem>
      ))}
    </>
  );

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgb(149 16 13)',
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
          background: 'rgb(149 16 13)',
          borderBottom: 'solid 1px #e8e8e8',
          gap: '30px',
          justifyContent: matches ? 'flex-start' : 'space-between',
        }}
      >
        <a href='/'>
          <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <img src={logo} width={200} />
          </div>
        </a>
        {matches ? (
          <Menu mode='horizontal' defaultSelectedKeys={['2']} style={{ width: '500px', background: '#e10600' }}>
            {MenuItems}
          </Menu>
        ) : (
          <div onClick={() => setHeaderDrawerOpen(true)}>
            <MenuOutlined style={styles.headerHamburger(themeConfiguration)} />
          </div>
        )}
      </div>
      <DrawerComponent
        title='Streameast Soccer'
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
