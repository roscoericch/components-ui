import { SpinProps } from "../spin/types";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /** button type */
  variant?: "primary" | "default" | "outlined" | "link" | "text";
  /** What color to use */
  theme?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large" | "icon";
  /** Button contents */
  label?: string;
  ghost?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  spinProps?: SpinProps;
  loading?: boolean;
  destructive?: boolean;
}
