import { Label } from "component-ui";
import React from "react";

const CheckBox = React.forwardRef<HTMLInputElement>((props, ref) => {
  return (
    <span className="checkbox--container">
      <input {...props} ref={ref} type="checkbox" />
      <Label></Label>
    </span>
  );
});

export default CheckBox;
