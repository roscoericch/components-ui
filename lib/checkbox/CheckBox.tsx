/** @jsxImportSource @emotion/react */
import { Label } from "component-ui";
import React, { useId } from "react";
import { CheckBoxProps } from "./types";
import "./checkbox.css";
import clsx from "clsx";
import { cva } from "class-variance-authority";
import CheckIcon from "../assets/icons/CheckIcon";
import { colorVariation } from "../utils/theme";
import { css } from "@emotion/react";

const checkBoxVariant = cva("component-ui-style custom--checkbox", {
  variants: {
    disabled: {
      true: "checkbox--disabled",
      false: null,
    },
  },
});

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ children, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.checked);
    const id = useId();
    const style = {
      [`--checkbox-color`]: colorVariation(props.theme, 0.9),
      [`--checkbox-color-light`]: colorVariation(props.theme, 0.6),
      [`--checkbox-color-light-fade`]: colorVariation(props.theme, 0.3),
      [`--checkbox-color-dark`]: colorVariation(props.theme, 1),
    };
    return (
      <Label
        htmlFor={props.id ?? id}
        className={checkBoxVariant({ disabled: props.disabled })}
        css={css({ ...style })}
      >
        <input
          {...props}
          onChange={(e) => {
            setChecked((prev) => !prev);
            props.onChange && props.onChange(e);
          }}
          checked={checked}
          ref={ref}
          type="checkbox"
          id={props.id ?? id}
          className={clsx(props.className, "checkbox--input peer")}
        />
        <span className="checkbox">
          <CheckIcon
            fill={props.disabled ? "#a5a0a0" : props.indicator ?? "#FFF"}
            className="checkbox--icon"
            strokeWidth={50}
          />
        </span>
        {children}
      </Label>
    );
  }
);
