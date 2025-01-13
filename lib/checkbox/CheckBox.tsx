import { Label } from "component-ui";
import React, { useId } from "react";
import { CheckBoxProps } from "./types";
import "./checkbox.css";
import clsx from "clsx";

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.checked);
    const id = useId();
    return (
      <Label htmlFor={id} className="custom--checkbox">
        <input
          {...props}
          onChange={(e) => {
            setChecked((prev) => !prev);
            props.onChange && props.onChange(e);
          }}
          checked={checked}
          ref={ref}
          type="checkbox"
          id={id}
          className={clsx(props.className, "checkbox--input peer")}
        />
        <span className="checkbox"></span>
        {label}
      </Label>
    );
  }
);
