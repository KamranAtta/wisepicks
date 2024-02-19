import { Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/Header';
import Fixture from './views/Fixture';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import FooterComponent from './components/Footer';
import ContactUsComponent from './components/Form/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import AboutUs from './components/AboutUs';
import Standings from './views/Standings';
import LandingPage from './views/Landing';
import CategoryTalks from './views/CategoryTalk';
import TalkDetail from './views/TalkDetail';
import { styles } from './styles';
import TalkForm from './components/Form/Talk';

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#001529',
}

const Router = () => {
  return (
    <Layout>
      <Header style={styles.header}>
        <HeaderComponent></HeaderComponent>
      </Header>
      <Content style={{background: 'white'}}>
        <Routes>
          <Route
            path='/'
            element={
              <LandingPage />
            }
          />
          <Route
            path='/talks/:categoryName'
            element={
              <CategoryTalks />
            }
          />
          <Route
            path='/topic/:categoryName'
            element={
              <CategoryTalks />
            }
          />
          <Route
            path='/talks/:categoryName/:id'
            element={
              <TalkDetail />
            }
          />
          <Route
            path='/talks/create-talk'
            element={
              <TalkForm />
            }
          />
          <Route
            path='/talks/:categoryName/:id/update'
            element={
              <TalkForm />
            }
          />
          <Route
            path='/fixture/:teams'
            element={
              <Fixture />
            }
          />
          <Route
            path='/leagues/standings'
            element={
              <Standings />
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
