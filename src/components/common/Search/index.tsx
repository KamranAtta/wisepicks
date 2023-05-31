import Search from 'antd/es/transfer/search';
import { TransferSearchProps } from './Search.interface';

const SearchBar = ({
  value,
  disabled,
  onChange,
  placeholder,
  handleClear,
}: TransferSearchProps) => {
  return (
    <Search
      value={value}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      handleClear={handleClear}
    />
  );
};

SearchBar.defaultProps = {
  value: '',
  disabled: false,
  onchange: () => null,
  placeholder: '',
  handleClear: () => null,
};

export default SearchBar;
