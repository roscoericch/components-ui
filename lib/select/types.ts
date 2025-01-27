import React from "react";

export interface ISelectProps<T> {
  options: ISelectOptionProps<T>[];
  value?: T;
  onChange?: (value: T) => void;
  search?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onSearch?: (value: T) => void;
  position?: "top" | "bottom";
  renderNoOptions?: () => React.ReactNode; // Render when no options are available
}

export interface ISelectOptionProps<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SelectRef {
  focus: () => void;
  blur: () => void;
}
