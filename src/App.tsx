import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Router from './Routes';
import { customTheme } from './theme';
import { store } from './store/store';

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
