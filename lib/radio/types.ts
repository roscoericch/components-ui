export type IRadioProps =
  | {
      options: IRadioItemProps[]; // Use options array
      children?: never; // No children allowed if options are provided
      value?: any;
      onChange?: (e: Event) => void;
      className?: string;
    }
  | {
      options?: never; // No options allowed if children are provided
      children: React.ReactNode;
      value?: any;
      onChange?: (e: Event) => void;
      className?: string;
    };

export interface IRadioItemProps {
  children?: React.ReactNode;
  value?: any;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  className?: string;
}
