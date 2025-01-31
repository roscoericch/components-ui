import "./select.css";
import { useState, useRef, useEffect, useId, type KeyboardEvent } from "react";
import { Button, Input } from "component-ui";
import clsx from "clsx";
import { createPortal } from "react-dom";
import Comp from "../shared/Comp";
import { ISelectProps } from "./types";

export const Select = <T,>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  renderNoOptions = () => "No options available",
  search = false,
  position = "bottom",
}: ISelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<T | null>(value ?? null);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [internalOptions, setInternalOptions] = useState(options);
  const [dropdownPosition, setDropdownPosition] =
    useState<ISelectProps<T>["position"]>(position);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const dropdownId = useId();
  const listboxId = `${dropdownId}-listbox`;

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value ?? null);
    }
  }, [value, isControlled]);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && listboxRef.current && activeIndex >= 0) {
      const activeOption = listboxRef.current.children[activeIndex];
      activeOption?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen]);

  const updateDropdownPosition = () => {
    if (!buttonRef.current || !listboxRef.current) return;

    const triggerRect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = listboxRef.current.offsetHeight + 10;

    const spaceBelow = window.innerHeight - triggerRect.bottom;

    // Choose position based on available space
    setDropdownPosition(spaceBelow >= dropdownHeight ? "bottom" : "top");
  };

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      window.addEventListener("resize", updateDropdownPosition);
      window.addEventListener("scroll", updateDropdownPosition);
    }
    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition);
    };
  }, [isOpen]);

  const handleButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(0);
        } else {
          const increment = e.key === "ArrowDown" ? 1 : -1;
          let newIndex = activeIndex + increment;
          if (newIndex < 0) newIndex = options.length - 1;
          if (newIndex >= options.length) newIndex = 0;
          setActiveIndex(newIndex);
        }
        break;
      }

      case "Enter":
      case " ": {
        e.preventDefault();
        if (
          isOpen &&
          activeIndex >= 0 &&
          options[activeIndex] &&
          !options[activeIndex].disabled
        ) {
          handleSelection(options[activeIndex].value);
        }
        setIsOpen(!isOpen);
        break;
      }

      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;

      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  const handleSelection = (value: T) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    if (search && inputValue) {
      setInputValue("");
      setInternalOptions(options); // Reset options
    }
    onChange?.(value);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const selectedLabel =
    options.find((opt) => opt.value === currentValue)?.label || placeholder;

  return (
    <div ref={dropdownRef} className={`dropdown-container ${className}`}>
      <Comp
        ref={buttonRef}
        id={dropdownId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen ? `${listboxId}-${activeIndex}` : undefined
        }
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
        onKeyDown={handleButtonKeyDown}
        aria-disabled={disabled}
      >
        {search ? (
          <Input
            value={inputValue}
            placeholder={selectedLabel ?? "Search"}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onBlur={() => {
              setInputValue("");
            }}
            className={clsx("dropdown-input", {
              "dropdown-input-active": selectedLabel && !isOpen,
            })}
            disabled={disabled}
          />
        ) : (
          <Button className={`dropdown-button`} disabled={disabled}>
            {selectedLabel}
          </Button>
        )}
      </Comp>
      <ul
        id={listboxId}
        ref={listboxRef}
        role="listbox"
        aria-labelledby={dropdownId}
        className={clsx(`dropdown-list`, `dropdown-list-${dropdownPosition}`, {
          open: isOpen,
        })}
        tabIndex={-1}
      >
        {isOpen &&
          createPortal(
            <>
              {internalOptions.filter((e) => e.label.includes(inputValue))
                .length === 0 ? (
                <li className={`dropdown-no-options`}>{renderNoOptions()}</li>
              ) : (
                internalOptions
                  .filter((e) => e.label.includes(inputValue))
                  .map((option, index) => (
                    <Button
                      variant={
                        internalValue === option.value ? "primary" : "default"
                      }
                      key={index}
                      disabled={option.disabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!option.disabled) handleSelection(option.value);
                      }}
                      asChild
                    >
                      <li
                        id={`${listboxId}-${index}`}
                        role="option"
                        aria-selected={currentValue === option.value}
                        className={`dropdown-option ${
                          activeIndex === index ? "active" : ""
                        } ${currentValue === option.value ? "selected" : ""}`}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        {option.label}
                      </li>
                    </Button>
                  ))
              )}
            </>,
            document.querySelector(".dropdown-list")!
          )}
      </ul>
    </div>
  );
};
