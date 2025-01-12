export interface itemProps {
  label: React.ReactNode;
  key: string;
}

export interface DropdownProps {
  options: itemProps[];
  open?: boolean;
  classes?: { trigger: string; popup: string }; // Custom class for the dropdown
  style?: React.CSSProperties; // Custom styles
  children: React.ReactElement;
  onDropdownClick?: (item: itemProps) => void;
  onOpenChange?: (nexOpen: boolean) => void;
  trigger?: ("hover" | "click")[];
}
