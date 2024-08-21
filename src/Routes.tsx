import { Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/Header';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import FooterComponent from './components/Footer';
import ContactUsComponent from './components/Form/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import AboutUs from './components/AboutUs';
import LandingPage from './views/Landing';
import CategoryTalks from './views/CategoryTalk';
import TalkDetail from './views/TalkDetail';
import { styles } from './styles';
import TalkForm from './components/Form/Talk';
import VideoForm from './components/Form/AddVideo';

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
      <Content style={{background: '#5b5555'}}>
        <Routes>
          <Route
            path='/'
            element={
              <LandingPage />
            }
          />
          <Route
            path='/videos/:categoryName/:id/update'
            element={
              <TalkForm />
            }
          />
          <Route
            path='/videos/:categoryName/:id'
            element={
              <TalkDetail />
            }
          />
          <Route
            path='/videos/:categoryName/:subCategoryName'
            element={
              <CategoryTalks />
            }
          />
          <Route
            path='/videos/:categoryName'
            element={
              <CategoryTalks />
            }
          />
          <Route
            path='/:categoryName/:subCategoryName'
            element={
              <CategoryTalks />
            }
          />
          <Route
            path='/:categoryName'
            element={
              <CategoryTalks />
            }
          />
          <Route
            path='/talks'
            element={
              <CategoryTalks />
            }
          />
          <Route
            path='/create-talk'
            element={
              <TalkForm />
            }
          />
          <Route
            path='/video/add'
            element={
              <VideoForm />
            }
          />
          <Route
            path='/about-us'
            element={
              <AboutUs noLogo={false}/>
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
