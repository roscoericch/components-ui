import { useState, useRef, useEffect, useCallback } from "react";

import "./dropdown.css";
import Comp from "../shared/Comp";
import { DropdownProps, itemProps } from "./types";
import clsx from "clsx";

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
    <div className={`dropdown--container`} style={style}>
      <Comp
        role="button"
        className={clsx(`dropdown--toggle`, classes?.trigger)}
        onClick={trigger.includes("click") ? toggleDropdown : () => {}}
        onMouseEnter={trigger.includes("hover") ? toggleDropdown : () => {}}
        onMouseLeave={trigger.includes("hover") ? toggleDropdown : () => {}}
      >
        {children}
      </Comp>
      <div
        ref={dropdownRef}
        className={clsx(`dropdown--menu`, classes?.popup, { open: isOpen })}
        style={style}
      >
        <ul className="dropdown--menu-list">
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown--item`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
