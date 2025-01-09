import React from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

import "./button.css";
import { lightVariation } from "../utils/theme";
import Spin from "../spin/Spin";
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
}

const buttonVariants = cva("button component-ui-style", {
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
      icon: "button--icon button--small",
    },
    ghost: {
      true: "button--ghost",
      false: null,
    },
    iconPosition: {
      left: null,
      right: "button--icon--right",
    },
    loading: {
      true: "button--loading",
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
      class: "button--primary-ghost button--ghost",
    },
  ],
});

/** Primary UI component for user interaction */
export const Button = ({
  variant = "default",
  size,
  theme,
  ghost,
  icon,
  iconPosition,
  loading,
  spinProps,
  ...props
}: ButtonProps) => {
  const style = {
    [`--button-${variant}-color`]: theme,
    [`--button-${variant}-color-light`]: lightVariation(theme, 0.6),
    [`--button-${variant}-color-light-fade`]: lightVariation(theme, 0.3),
  } as React.CSSProperties;
  return (
    <button
      {...props}
      className={clsx(
        buttonVariants({ variant, size, ghost, iconPosition, loading }),
        props.className
      )}
      style={{ ...style, ...props.style }}
    >
      {icon}
      {loading && (
        <Spin
          {...spinProps}
          color={props.disabled ? "rgba(0, 0, 0, 0.25)" : spinProps?.color}
        />
      )}
      <span>{props.children || props.label}</span>
    </button>
  );
};
