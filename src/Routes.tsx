import { Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/Header';
import Home from './views/Home';
import Fixture from './views/Fixture';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import FooterComponent from './components/Footer';
import ContactUsComponent from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import AboutUs from './components/AboutUs';

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#95100d',
}

const Router = () => {
  return (
    <Layout>
      <Header style={{paddingInline: '0px'}}>
        <HeaderComponent></HeaderComponent>
      </Header>
      <Content>
        <Routes>
          <Route
            path='/streams/:categoryName'
            element={
              <Home />
            }
          />
          <Route
            path='/'
            element={
              <Home />
            }
          />
          <Route
            path='/fixture/:teams'
            element={
              <Fixture />
            }
          />
          <Route
            path='/about-us'
            element={
              <AboutUs />
            }
          />
          <Route
            path='/contact'
            element={
              <ContactUsComponent />
            }
          />
          <Route
            path='/privacy-policy'
            element={
              <PrivacyPolicy />
            }
          />
        </Routes>
      </Content>
      <Footer style={footerStyle}>
        <FooterComponent></FooterComponent>
      </Footer>
    </Layout>
  );
};

export default Router;
