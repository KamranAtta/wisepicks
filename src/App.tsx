import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Router from './Routes';
import { theme } from './theme';
import { store } from './store/store';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
