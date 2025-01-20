export interface ISelectProps {
  options: ISelectOptionProps[];
  value: string;
  onChange: (value: string) => void;
  search: boolean;
  placeholder: string;
}

export interface ISelectOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
}
