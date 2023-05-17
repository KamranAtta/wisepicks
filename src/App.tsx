import './App.css';
import { theme } from './theme';
import { store } from './store/store';

import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import Home from './views/home';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <Home />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
