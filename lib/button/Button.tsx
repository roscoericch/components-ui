/** @jsxImportSource @emotion/react */
import React, { cloneElement, forwardRef } from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { css } from "@emotion/react";

import "./button.css";
import { colorVariation } from "../utils/theme";
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
  (
    {
      iconPosition = "left",
      theme,
      variant,
      ghost,
      disabled,
      loading,
      size = "small",
      spinProps,
      icon,
      ...props
    },
    forwardedRef
  ) => {
    const style = {
      [`--button-${variant}-color`]: colorVariation(
        props.destructive ? "#ff4d4f" : theme,
        0.9
      ),
      [`--button-${variant}-color-light`]: colorVariation(
        props.destructive ? "#ff4d4f" : theme,
        0.6
      ),
      [`--button-${variant}-color-light-fade`]: colorVariation(
        props.destructive ? "#ff4d4f" : theme,
        0.3
      ),
      [`--button-${variant}-color-dark`]: colorVariation(
        props.destructive ? "#ff4d4f" : theme,
        1
      ),
    };
    const Component = props.asChild ? Comp : "button";

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
        {props.asChild
          ? extractElementsFromNode(props.children)
          : props.children}
        {iconPosition === "right" && icon}
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
                variant,
                size: size,
                ghost: ghost,
                loading: loading,
                disabled: disabled,
              }),
              props.children.props.className,
              props.className
            ),
            style: { ...props.children.props.style, ...style },
            ref: forwardedRef,
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
            variant,
            size,
            ghost,
            loading,
            disabled,
          }),
          props.className
        )}
        css={css({ ...style })}
        ref={forwardedRef}
        aria-disabled={disabled}
      >
        {content}
      </Component>
    );
  }
);

Button.displayName = "Button";
