import React, { cloneElement, forwardRef } from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

import "./button.css";
import { darkVariation, lightVariation } from "../utils/theme";
import Spin from "../spin/Spin";
import { ButtonProps } from "./types";
import Comp from "../shared/Comp";

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

const extractElementsFromNode = (node: React.ReactNode) => {
  if (React.isValidElement(node)) {
    return <React.Fragment>{node.props.children}</React.Fragment>;
  } else return node;
};

/** Primary UI component for user interaction */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = "default",
    size,
    theme,
    ghost,
    icon,
    iconPosition,
    loading,
    spinProps,
    destructive,
    asChild,
    disabled,
    ...props
  }) => {
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
    const Component = asChild ? Comp : "button";

    const content = (
      <>
        {/* Predefined Children */}
        {loading && (
          <Spin
            {...spinProps}
            color={
              disabled ? "rgba(0, 0, 0, 0.25)" : spinProps?.color ?? "#FFF"
            }
          />
        )}
        {iconPosition === "left" && icon}
        {extractElementsFromNode(props.children)}
        {iconPosition === "right" && icon}
      </>
    );

    if (asChild) {
      if (React.isValidElement(props.children)) {
        return cloneElement(
          props.children,
          {
            ...props.children.props,
            ...props,
            className: clsx(
              buttonVariants({ variant, size, ghost, loading }),
              props.children.props.className,
              props.className
            ),
            style: { ...props.children.props.style, ...style },
          },
          content
        );
      }
      return null;
    }
    return (
      <Component
        className={clsx(
          buttonVariants({ variant, size, ghost, loading }),
          props.className
        )}
        style={style}
        {...props}
      >
        {content}
      </Component>
    );
  }
);

Button.displayName = "Button";
