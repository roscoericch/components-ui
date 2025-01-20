export interface ISelectProps {
  options: ISelectOptionProps[];
  value: string;
  onChange: (value: any) => void;
  search: boolean;
  placeholder: string;
  disabled: boolean;
  classes: { trigger: string; popup: string };
  onSearch: (value: any) => void;
}

export interface ISelectOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
}
