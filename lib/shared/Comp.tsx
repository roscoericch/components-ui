import { CompProps } from "./types";
import { cloneElement, forwardRef } from "react";

const Comp = forwardRef<HTMLElement, CompProps>(
  ({ children, ...props }, ref) => {
    return cloneElement(children, {
      ...children.props,
      ...props,
      ref,
    });
  }
);

export default Comp;
