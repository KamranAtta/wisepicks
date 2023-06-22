import { Input } from 'antd';
// import Search from 'antd/es/transfer/search';
import { TransferSearchProps } from './Search.interface';

const SearchBar = ({
  value,
  disabled,
  onChange,
  placeholder,
  onPressEnter,
}: TransferSearchProps) => {
  return (
    <Input
      value={value}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      onPressEnter={onPressEnter}
    />
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
