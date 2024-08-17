import { styles } from './styles';
import { Input, AutoComplete, notification, Row, Col } from 'antd';
// import Search from 'antd/es/transfer/search';
// import { TransferSearchProps } from './Search.interface';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchTalk } from '../../../apis/fixture.api';
import { MESSAGES } from '../../../utils/constant';
const { Search } = Input;
const TALK_QUERY_INITIAL = { query: '', status: '' };


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [talkDropdown, setTalkDropdown] = useState<any>([]);
  const [talkQuery, setTalkQuery] = useState<any>(TALK_QUERY_INITIAL);
  const timeout: any = useRef();
  const navigate = useNavigate();
  
  const searchTalks = () => {
    if(talkQuery?.query){
        navigate(`/talks?search=${talkQuery?.query}`);
    }
  } 

  const handleSearchQueryChange = (event: FormEvent<HTMLElement>) => {
      setSearchQuery((event.target as HTMLInputElement).value);
  };

  const submitSearchInput = async () => {
      setTalkQuery((prev: any) => ({ ...prev, query: searchQuery }));
  };

  const handleSearchDropdownSelect = (value: any) => {
      setTalkQuery((prev: any) => ({ ...prev, query: value }));
  };

  const handleSearchTalk = (value: any) => {
      clearTimeout(timeout?.current);
      if (value) {
          timeout.current = setTimeout(async () => {
          // console.log('talkQuery', talkQuery);
          const result = await searchTalk(value);
          if (result?.statusCode == 200) {
              const finalDropdown = result?.data?.map((talk: any) => {
                  return {
                  value: talk?.title,
                  label: <>
                  <span style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'center'}}>
                    <Row gutter={24}>
                      <Col><img src={talk?.thumbnail} alt="search-image" style={{width: '60px', height:'60px'}}/>
                      </Col>
                      <Col>
                          <h4 style={{padding:'0px', margin: '0px'}}>{talk?.title}</h4>
                          <p style={{padding:'0px', margin: '0px'}}>{talk?.rating} {talk?.type} {talk?.year} {talk?.duration}</p>
                      </Col>
                    </Row>                 
                  </span>
                  </>,
                  };
              });
              setTalkDropdown(finalDropdown);
              setSearchQuery(value);
              } else {
              notification.open({
                  message: MESSAGES.ERROR,
              });
              }
          }, 1000);
      } else {
          setTalkDropdown([]);
      }
  };

  useEffect(() => {
      searchTalks();
    }, [talkQuery]);

  return (
    <AutoComplete
      style={styles.autoComplete}
      options={talkDropdown}
      onSelect={(e) => handleSearchDropdownSelect?.(e)}
      onSearch={(e) => handleSearchTalk?.(e)}
    >
      <Search
        value={searchQuery}
        disabled={false}
        onChange={(e: FormEvent<HTMLElement>) => handleSearchQueryChange(e)}
        placeholder={'Search'}
        onSearch={submitSearchInput}
      />
    </AutoComplete>    
  );
};

SearchBar.defaultProps = {
  value: '',
  disabled: false,
  onchange: () => null,
  placeholder: '',
  onPressEnter: () => null,
};

export default SearchBar;
