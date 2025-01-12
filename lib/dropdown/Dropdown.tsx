import React, { useState, useRef, useEffect, useCallback } from "react";

import "./dropdown.css";
import Comp from "../shared/Comp";

interface DropdownProps<T> {
  options: T[]; // Array of options
  labelKey?: keyof T; // Key for label (default assumes T is string)
  onSelect?: (option: T) => void; // Callback when an option is selected
  placeholder?: string; // Placeholder text
  className?: string; // Custom class for the dropdown
  style?: React.CSSProperties; // Custom styles
  children: React.ReactElement;
}

export function Dropdown<T extends object | string>({
  options,
  labelKey,
  onSelect,
  placeholder = "Select an option",
  className,
  style,
  children,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleSelect = (option: T) => {
    setSelected(option);
    onSelect?.(option);
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
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const getLabel = (option: T) =>
    typeof option === "string"
      ? option
      : (option[labelKey as keyof T] as string);

  return (
    <div
      className={`dropdown ${className || ""}`}
      style={style}
      ref={dropdownRef}
    >
      <Comp role="button" className="dropdown-toggle" onClick={toggleDropdown}>
        {children}
      </Comp>
      <button
        type="button"
        className="dropdown-toggle"
        onClick={toggleDropdown}
      >
        {selected ? getLabel(selected) : placeholder}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                selected === option ? "selected" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {getLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
