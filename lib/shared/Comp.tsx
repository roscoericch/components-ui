import clsx from "clsx";
import { CompProps } from "./types";
import { cloneElement, forwardRef } from "react";

const Comp = forwardRef<HTMLElement, CompProps>(
  ({ children, ...props }, ref) => {
    return cloneElement(children, {
      ...children.props,
      ...props,
      ref,
      className: clsx(children.props.className, props.className),
    });
  }
);

Comp.displayName = "Comp";

export default Comp;
