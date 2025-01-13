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
    disabled: {
      true: "button--disabled",
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
  ({ ...props }) => {
    const style = {
      [`--button-${props.variant}-color`]: props.destructive
        ? "#ff4d4f"
        : props.theme,
      [`--button-${props.variant}-color-light`]: lightVariation(
        props.destructive ? "#ff4d4f" : props.theme,
        0.6
      ),
      [`--button-${props.variant}-color-light-fade`]: lightVariation(
        props.destructive ? "#ff4d4f" : props.theme,
        0.3
      ),
      [`--button-${props.variant}-color-dark`]: darkVariation(
        props.destructive ? "#ff4d4f" : props.theme,
        0.3
      ),
    } as React.CSSProperties;
    const Component = props.asChild ? Comp : "button";

    const content = (
      <>
        {/* Predefined Children */}
        {props.loading && (
          <Spin
            {...props.spinProps}
            color={
              props.disabled
                ? "rgba(0, 0, 0, 0.25)"
                : props.spinProps?.color ?? "#FFF"
            }
          />
        )}
        {props.iconPosition === "left" && props.icon}
        {extractElementsFromNode(props.children)}
        {props.iconPosition === "right" && props.icon}
      </>
    );

    if (props.asChild) {
      if (React.isValidElement(props.children)) {
        return cloneElement(
          props.children,
          {
            ...props.children.props,
            ...props,
            className: clsx(
              buttonVariants({
                variant: props.variant,
                size: props.size,
                ghost: props.ghost,
                loading: props.loading,
                disabled: props.disabled,
              }),
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
        {...props}
        className={clsx(
          buttonVariants({
            variant: props.variant,
            size: props.size,
            ghost: props.ghost,
            loading: props.loading,
            disabled: props.disabled,
          }),
          props.className
        )}
        style={style}
      >
        {content}
      </Component>
    );
  }
);

Button.displayName = "Button";
