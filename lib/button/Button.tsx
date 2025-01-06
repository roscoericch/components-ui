import React from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

import "./button.css";
import { darkVariation, lightVariation } from "../utils/theme";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /** button type */
  variant?: "primary" | "default" | "outlined" | "link" | "text";
  /** What background color to use */
  theme?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  ghost?: boolean;
}

const button = cva("button", {
  variants: {
    variant: {
      primary: "button--primary",
      default: "button--default",
      outlined: "button--outlined",
      link: "button--link button--link--text",
      text: "button--text button--text--text",
    },
    size: {
      small: "button--small",
      medium: "button--medium",
      large: "button--large",
    },
    ghost: {
      true: "button--ghost",
      false: null,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "medium",
  },
  compoundVariants: [
    {
      variant: "primary",
      ghost: true,
      class: "button--outlined button--ghost",
    },
  ],
});

/** Primary UI component for user interaction */
export const Button = ({
  variant,
  size,
  label,
  theme,
  ghost,
  ...props
}: ButtonProps) => {
  const style = {
    [`--button-${variant}-color`]: theme,
    [`--button-${variant}-color-light`]: lightVariation(theme, 0.6),
    [`--button-${variant}-color-light-fade`]: lightVariation(theme, 0.3),
    [`--button-${variant}-color-dark`]: darkVariation(theme, 50),
  } as React.CSSProperties;
  return (
    <button
      {...props}
      className={clsx(button({ variant, size, ghost }), props.className)}
      style={{ ...style, ...props.style }}
    >
      {label}
    </button>
  );
};
