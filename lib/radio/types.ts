import React from "react";

export type IRadioProps =
  | (Omit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      "children"
    > & {
      options?: IRadioItemProps[]; // Use options array
      children?: React.ReactNode; // Allow children
      value?: any;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    })
  | (React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > & {
      options?: never; // No options allowed if children are provided
      children: React.ReactNode;
      value?: any;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      className?: string;
    });

export interface IRadioItemProps {
  children?: React.ReactNode;
  value?: any;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
