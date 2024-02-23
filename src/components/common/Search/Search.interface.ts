export interface TransferSearchProps {
  prefixCls?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLElement>) => void;
  // handleClear?: () => void;
  value?: string;
  disabled?: boolean;
  onPressEnter?: () => void;
  talkDropdown?: any;
  handleSearchDropdownSelect?: (e: any) => void;
  handleSearchTalk?: (e: any) => void;
}
