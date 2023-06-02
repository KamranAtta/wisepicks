import { ConfigProvider } from 'antd';
import React, { useContext } from 'react';
import { MenuOutlined } from '@ant-design/icons';

import MenuDropDown from '../common/DropDown';
import ButtonComponent from '../common/Button';
import { ButtonLayout as ButtonLayoutI } from './ButtonLayout.interface';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import { ConfigConsumerProps } from 'antd/lib/config-provider';

const styles = {
  layoutWrapper: { display: 'flex', justifyContent: 'space-between', marginBottom: '1em' },
  leftWrapper: { display: 'flex', alignContent: 'center', gap: '10px' },
  rightWrapper: { display: 'flex', justifyContent: 'space-between' },
  headerHamburger: (themeConfig: ConfigConsumerProps) => ({
    color: themeConfig?.theme?.token?.colorPrimary,
    paddingTop: '8px',
    height: '13px',
    width: '13px',
  }),
  MenubuttonWrapper: { width: '100%' },
};

export default function ButtonLayout({ left, right, title }: ButtonLayoutI) {
  const themeConfiguration = useContext(ConfigProvider.ConfigContext);
  const matches = useMediaQuery('(min-width: 830px)');
  return matches ? (
    <React.Fragment>
      <div style={styles.layoutWrapper}>
        <div style={styles.leftWrapper}>
          {title && title}
          {left.map((buttonConfig, index) => (
            <div key={index}>
              <ButtonComponent {...buttonConfig.props}>{buttonConfig?.children}</ButtonComponent>
            </div>
          ))}
        </div>
        <div style={styles.rightWrapper}>
          {right.map((buttonConfig, index: number) => (
            <div key={index}>
              <ButtonComponent {...buttonConfig.props}>{buttonConfig?.children}</ButtonComponent>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div style={styles.layoutWrapper}>
        <div style={styles.leftWrapper}>{title && title}</div>
        <div style={styles.rightWrapper}>
          <div onClick={() => true}></div>
          <MenuDropDown
            items={[...left, ...right].map((buttonConfig, index) => ({
              key: index,
              label: (
                <ButtonComponent style={styles.MenubuttonWrapper} {...buttonConfig.props}>
                  {buttonConfig?.children}
                </ButtonComponent>
              ),
            }))}
            placement='bottomRight'
          >
            <MenuOutlined style={styles.headerHamburger(themeConfiguration)} />
          </MenuDropDown>
        </div>
      </div>
    </React.Fragment>
  );
}
