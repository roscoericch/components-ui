/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import "./input.css";
import { colorVariation } from "../utils/theme";
import HideIcon from "../assets/icons/HideIcon";
import ShowIcon from "../assets/icons/ShowIcon";
import { css } from "@emotion/react";
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

export interface PasswordInputProps extends InputProps {
  showPassword?: boolean;
  onVisibleToggle?: (value: boolean) => void;
}

const inputVariants = cva("input component-ui-style", {
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
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, size, prefix, suffix, theme, ...props }, ref) => {
    const style = {
      [`--input-theme`]: colorVariation(theme),
      [`--input-theme-light`]: colorVariation(theme, 0.6),
      [`--input-theme-light-fade`]: colorVariation(theme, 0.3),
    };
    return (
      <>
        {prefix || suffix ? (
          <span
            css={css({ ...style })}
            className={clsx(
              "input--container",
              inputVariants({ variant, size }),
              { "input--container-disabled": props.disabled }
            )}
            role="input"
            aria-disabled={props.disabled}
          >
            <span aria-disabled={props.disabled} className="input--prefix">
              {prefix}
            </span>
            <input
              {...props}
              ref={ref}
              className={clsx("input--inline", props.className)}
            />
            <span aria-disabled={props.disabled} className="input--suffix">
              {suffix}
            </span>
          </span>
        ) : (
          <input
            {...props}
            ref={ref}
            className={clsx(inputVariants({ variant, size }), props.className)}
            css={css({ ...style })}
          />
        )}
      </>
    );
  }
);

export const Password = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showPassword, onVisibleToggle, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const isControlled = showPassword !== undefined;
    useEffect(() => {
      if (isControlled) {
        setShow(showPassword);
      }
    }, [isControlled, showPassword]);
    return (
      <Input
        {...props}
        suffix={
          show ? (
            <ShowIcon
              role="button"
              aria-disabled={props.disabled}
              onClick={() => {
                if (props.disabled) return;
                setShow(false);
                onVisibleToggle?.(false);
              }}
              stroke={props.disabled ? "#3f3c3c" : "#000"}
            />
          ) : (
            <HideIcon
              role="button"
              aria-disabled={props.disabled}
              onClick={() => {
                if (props.disabled) return;
                setShow(true);
                onVisibleToggle?.(true);
              }}
              stroke={props.disabled ? "#3f3c3c" : "#000"}
            />
          )
        }
        type={!show ? "password" : ""}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";
Password.displayName = "Input.Password";

type InputComponent = typeof Input & { Password: typeof Password };
const ComponentInput = Input as InputComponent;
ComponentInput.Password = Password;
export default ComponentInput;
