import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Router from './Routes';
import { customTheme } from './theme';
import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
