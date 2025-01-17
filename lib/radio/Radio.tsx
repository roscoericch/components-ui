"use client"; //nextjs ssr--usecase
import "./radio.css";
import React, { useId, useState } from "react";
import { Label, Button } from "component-ui";
import { IRadioProps } from "./types";
import clsx from "clsx";
import { cva } from "class-variance-authority";

const radiovariant = cva("radio--container component-ui-style ");

export const Radio = React.forwardRef<HTMLInputElement, IRadioProps>(
  ({ children, ...props }, ref) => {
    const id = useId();
    const [checked, setChecked] = useState(props.checked);
    return (
      <div className={clsx(radiovariant({}), props.className)}>
        <Button
          variant={props.checked ? "primary" : "outlined"}
          className="radio--button"
          disabled={props.disabled}
        />
        <input
          id={props.id ?? id}
          {...props}
          onChange={(e) => {
            setChecked((prev) => !prev);
            props.onChange && props.onChange(e);
          }}
          checked={checked}
          className={clsx("radio--input peer")}
          ref={ref}
          type="radio"
        />
        <Label htmlFor={props.id ?? id}>{children}</Label>
      </div>
    );
  }
);
Radio.displayName = "Radio";
