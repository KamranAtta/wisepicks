/* eslint-disable camelcase */
import {
    Row,
    notification,
  } from 'antd';
  import { useState } from 'react';
  import Loader from '../../common/Loader';
  import dayjs from 'dayjs';
  import { useNavigate, useParams } from 'react-router-dom';
  import weekday from 'dayjs/plugin/weekday';
  import localeData from 'dayjs/plugin/localeData';
  import { styles } from './styles';
  import { MESSAGES, talkCategories } from '../../../utils/constant';
  import { authenticateAdmin, deleteVideo } from '../../../apis/fixture.api';
  import LoginForm from '../Login';
  import { AuthInterface } from '../Login/interface';
  
  
  const DeleteVideo = () => {
    const navigate = useNavigate();
    const { id, categoryName } = useParams();
    dayjs.extend(weekday);
    dayjs.extend(localeData);
    const [loader, setLoader] = useState<boolean>(false);
  
    const authenticateUser = async (payload: AuthInterface) => {
      const response = await authenticateAdmin(payload);
      if(response?.data?.authenticated){
        await deleteVideo({ ...payload, id: id });
        setLoader(false);
        navigate(categoryName && talkCategories[0].categories.includes(categoryName) ? '/videos/Trailers': `/videos/${categoryName}`);
      } else {
        setLoader(false);
        notification.open({
          message: MESSAGES.LOGIN_ERROR,
        });
    }
    }
  
    return (
      <> 
      <LoginForm authenticateUser={authenticateUser}></LoginForm>
      <Row style={styles.center}>{loader ? <Loader /> : <></>}</Row>
      </>
    );
  };
  export default DeleteVideo;
  