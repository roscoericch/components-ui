import { useState, useRef, useEffect, useCallback } from "react";

import "./dropdown.css";
import Comp from "../shared/Comp";
import { DropdownProps, itemProps } from "./types";
import clsx from "clsx";
import { cva } from "class-variance-authority";
import { Button } from "component-ui";

const itemVariation = cva("dropdown--item", {
  variants: {
    disabled: { true: "dropdown--item-disabled", false: null },
  },
});

export function Dropdown({
  options,
  classes,
  style,
  children,
  open,
  trigger = ["hover"],
  onDropdownClick = () => {},
  onOpenChange = () => {},
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(open);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = (option: itemProps) => {
    onDropdownClick(option);
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    onOpenChange(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`dropdown--container component-ui-style`}
      onMouseLeave={
        trigger.includes("hover") ? () => setIsOpen(false) : () => {}
      }
      onMouseEnter={
        trigger.includes("hover") ? () => setIsOpen(true) : () => {}
      }
      style={style}
    >
      <Comp
        role="button"
        className={clsx(`dropdown--toggle`, classes?.trigger)}
        onClick={(e) => {
          trigger.includes("click") ? toggleDropdown() : () => {};
          children.props.onClick(e);
        }}
        aria-expanded={isOpen}
        aria-haspopup={"menu"}
      >
        {children}
      </Comp>
      <div
        className={clsx(`dropdown--menu`, classes?.popup, { open: isOpen })}
        style={style}
      >
        <ul className="dropdown--menu-list">
          {options.map((option, index) => (
            <Button
              onClick={() => {
                if (!option.disabled) handleSelect(option);
              }}
              asChild
              key={index}
              variant={"text"}
              theme="#2d2c2c"
              className="dropdown--menu-button"
              size="large"
              destructive={option.destructive}
              disabled={option.disabled}
              icon={option.icon}
            >
              <li className={itemVariation({ disabled: option.disabled })}>
                {option.label}
              </li>
            </Button>
          ))}
        </ul>
      </div>
    </div>
  );
}
