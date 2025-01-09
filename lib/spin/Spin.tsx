import { cva } from "class-variance-authority";
import { SpinProps } from "./types";
import clsx from "clsx";
import "./spin.css";

const spinVariants = cva("spin component-ui-style", {
  variants: {
    size: {
      small: "spin--small",
      medium: "spin--medium",
      large: "spin--large",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

const Spin = ({ color, size }: SpinProps) => {
  const style = {
    [`--spin-theme-color`]: color,
  } as React.CSSProperties;
  return (
    <span className={clsx(spinVariants({ size }))} style={{ ...style }}></span>
  );
};

export default Spin;
