export interface CheckBoxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: React.ReactNode;
  theme?: string;
  indicator?: string; //indicator color
}
