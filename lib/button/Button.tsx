import React from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

import "./button.css";
import { darkVariation, lightVariation } from "../utils/theme";
import Spin from "../spin/Spin";
import { ButtonProps } from "./types";

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
  destructive,
  ...props
}: ButtonProps) => {
  const style = {
    [`--button-${variant}-color`]: destructive ? "#ff4d4f" : theme,
    [`--button-${variant}-color-light`]: lightVariation(
      destructive ? "#ff4d4f" : theme,
      0.6
    ),
    [`--button-${variant}-color-light-fade`]: lightVariation(
      destructive ? "#ff4d4f" : theme,
      0.3
    ),
    [`--button-${variant}-color-dark`]: darkVariation(
      destructive ? "#ff4d4f" : theme,
      0.3
    ),
  } as React.CSSProperties;
  return (
    <button
      {...props}
      className={clsx(
        buttonVariants({ variant, size, ghost, loading }),
        props.className
      )}
      style={{ ...style, ...props.style }}
    >
      {loading && (
        <Spin
          {...spinProps}
          color={
            props.disabled ? "rgba(0, 0, 0, 0.25)" : spinProps?.color ?? "#FFF"
          }
        />
      )}
      {iconPosition === "left" && icon}
      {(props.children || props.label) && (
        <span>{props.children || props.label}</span>
      )}
      {iconPosition === "right" && icon}
    </button>
  );
};
