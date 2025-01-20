import React, { useState, useEffect, useRef } from "react";
import { ISelectOptionProps, ISelectProps } from "./types";
import { Button } from "component-ui";
import clsx from "clsx";

export const Select = React.forwardRef<
  HTMLSelectElement,
  Partial<ISelectProps>
>(({ ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.value || "");
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle selection
  const handleSelect = (option: ISelectOptionProps) => {
    if (option.disabled) return;
    setSelectedValue(option.value);
    setIsOpen(false);
    props.onChange?.(option.value);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return <div ref={containerRef}>Select</div>;
});

Select.displayName = "Select";
