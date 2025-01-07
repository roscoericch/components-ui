import React from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import "./input.css";
import { lightVariation } from "../utils/theme";
import User from "../assets/icons/User";
export interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "size" | "prefix" | "suffix"
  > {
  variant?: "outlined" | "filled" | "borderless";
  size?: "small" | "medium" | "large";
  theme?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const inputVariants = cva("input", {
  variants: {
    variant: {
      outlined: "input--outlined",
      filled: "input--filled",
      borderless: "input--borderless",
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
export const Input = ({
  variant,
  size,
  prefix,
  suffix,
  theme,
  ...props
}: InputProps) => {
  const style = {
    [`--input-theme`]: theme,
    [`--input-theme-light`]: lightVariation(theme, 0.6),
    [`--input-theme-light-fade`]: lightVariation(theme, 0.3),
  } as React.CSSProperties;
  return (
    <>
      {prefix || suffix ? (
        <span
          style={{ ...style }}
          className={clsx("input--container", inputVariants({ variant, size }))}
        >
          <span className="input--prefix">{prefix}</span>
          <input
            {...props}
            className={clsx("input--inline", props.className)}
          />
          <span className="input--suffix">{suffix}</span>
        </span>
      ) : (
        <input
          {...props}
          className={clsx(inputVariants({ variant, size }), props.className)}
          style={{ ...style, ...props.style }}
        />
      )}
    </>
  );
};

export default Input;
