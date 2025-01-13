import { useState, useRef, useEffect, useCallback } from "react";

import "./dropdown.css";
import Comp from "../shared/Comp";
import { DropdownProps, itemProps } from "./types";
import clsx from "clsx";
import { Button } from "component-ui";

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
  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

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
      className={`dropdown--container`}
      onMouseEnter={
        trigger.includes("hover") ? () => setIsOpen(true) : () => {}
      }
      onMouseLeave={
        trigger.includes("hover") ? () => setIsOpen(false) : () => {}
      }
      style={style}
    >
      <Comp
        role="button"
        className={clsx(`dropdown--toggle`, classes?.trigger)}
        onClick={trigger.includes("click") ? toggleDropdown : () => {}}
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
              onClick={() => handleSelect(option)}
              asChild
              key={index}
              variant="text"
              theme="#2d2c2c"
              className="dropdown--menu-button"
              size="large"
              destructive={option.destructive}
              disabled={option.disabled}
              icon={option.icon}
            >
              <li className={`dropdown--item`}>{option.label}</li>
            </Button>
          ))}
        </ul>
      </div>
    </div>
  );
}
