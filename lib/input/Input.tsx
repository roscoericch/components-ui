import React from "react";

import "./input.css";
import { cva } from "class-variance-authority";
import clsx from "clsx";

export interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "size"
  > {
  variant?: "outlined" | "filled" | "borderless";
  size?: "small" | "medium" | "large";
  theme?: string;
}

const inputVariants = cva("input", {
  variants: {
    variant: {
      outlined: "input--outlined",
      filled: "input--filled",
      borderless: "button--borderless",
    },
    status: {
      error: "input--error",
    },
    size: {
      small: "input--small",
      medium: "input--medium",
      large: "input--large",
    },
  },
  defaultVariants: {
    variant: "outlined",
    size: "medium",
  },
  compoundVariants: [],
});

/** Primary UI component for user interaction */
export const Input = ({ variant, size, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={clsx(inputVariants({ variant, size }), props.className)}
    />
  );
};
