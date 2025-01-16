"use client"; //nextjs ssr handling
import React, { useId } from "react";
import { Label } from "component-ui";
import { IRadioProps } from "./types";
import clsx from "clsx";
import { cva } from "class-variance-authority";

const radiovariant = cva("component-ui-style");

const Radio = React.forwardRef<HTMLInputElement, IRadioProps>(
  ({ children, ...props }, ref) => {
    const id = useId();
    return (
      <div className={clsx(radiovariant({}), props.className)}>
        <input
          id={id}
          {...props}
          className={clsx("radio--input")}
          ref={ref}
          type="radio"
        />
        <Label htmlFor={id}>{children}</Label>
      </div>
    );
  }
);

export default Radio;
