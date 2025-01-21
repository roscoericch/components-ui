export interface ISelectProps {
  options: ISelectOptionProps[];
  value: string;
  onSelect: (value: any) => void;
  search: boolean;
  placeholder: string;
  disabled: boolean;
  classes: { trigger: string; popup: string };
  onSearch: (value: any) => void;
  position: "top" | "bottom";
}

export interface ISelectOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectRef {
  focus: () => void;
  blur: () => void;
}
