import './App.css';
import { theme } from './theme';
import { ConfigProvider } from 'antd';
import ButtonComponent from './components/common/Button';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <ButtonComponent
        type='primary'
        onClick={() => {
          return true;
        }}
        style={{ width: '187px', height: '53px', margin: '30px' }}
      >
        ResourceAlly
      </ButtonComponent>
    </ConfigProvider>
  );
}

export default App;
