import { Select, SelectProps } from 'antd';

const SelectDropDown = ({ placeholder, options, ...otherProps }: SelectProps) => {
  return <Select placeholder={placeholder} options={options} {...otherProps} />;
};

SelectDropDown.defaultProps = {
  placeholder: '',
  options: [{ label: '', value: '' }],
};

export default SelectDropDown;
