"use client"; //nextjs ssr--usecase
import "./radio.css";
import React, { useEffect, useId, useState } from "react";
import { Label, Button } from "component-ui";
import { IRadioItemProps, IRadioProps } from "./types";
import clsx from "clsx";
import { cva } from "class-variance-authority";

const radioVariant = cva("radio--container component-ui-style ");

export const RadioGroup: React.FC<IRadioProps> = ({
  options,
  children,
  value,
  onChange,
  className,
  ...props
}) => {
  const [active, setActive] = useState(value);
  const handleChange = (val: any) => {
    onChange?.(val);
    setActive(val);
  };

  const renderedChildren = options
    ? options.map((option, index) => (
        <Radio
          key={index}
          value={option.value}
          checked={active === option.value}
          disabled={option.disabled}
          onChange={() => handleChange(option.value)}
          className={clsx(option.className)}
        >
          {option.children}
        </Radio>
      ))
    : React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type === Radio
          ? React.cloneElement(child as React.ReactElement<IRadioItemProps>, {
              checked: active === child.props?.value,
              onChange: () => handleChange(child.props?.value),
              value: child.props.value,
              disabled: child.props.disabled,
            })
          : child
      );

  return (
    <div className={clsx(className)} {...props}>
      {renderedChildren}
    </div>
  );
};

// Radio Component
export const Radio = React.forwardRef<HTMLInputElement, IRadioItemProps>(
  ({ value, checked, disabled, onChange, children, className }, ref) => {
    const id = useId();
    const [active, setActive] = useState(checked);
    useEffect(() => {
      setActive(checked);
    }, [checked]);
    return (
      <div className={clsx("radio--wrapper")}>
        <input
          id={id}
          type="radio"
          value={value}
          checked={active}
          disabled={disabled}
          onChange={(e) => {
            if (typeof checked === "undefined") setActive(e.target.checked);
            onChange?.(e);
          }}
          ref={ref}
          className="radio--input peer"
        />
        <Label
          htmlFor={id}
          className={clsx(radioVariant(), className, {
            "radio--disabled": disabled,
            "radio--checked": active,
          })}
        >
          <Button
            variant={active ? "primary" : "default"}
            className="radio--button"
            disabled={disabled}
          >
            <span className="radio--disc" />
          </Button>
          {children}
        </Label>
      </div>
    );
  }
);

Radio.displayName = "Radio";
