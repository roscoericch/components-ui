import clsx from "clsx";
import React from "react";
import "./label.css";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
>((props, ref) => {
  return (
    <label {...props} className={clsx("label", props.className)} ref={ref} />
  );
});

Label.displayName = "Label";
