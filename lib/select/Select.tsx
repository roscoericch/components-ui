import "./select.css";
import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import { ISelectOptionProps, ISelectProps, SelectRef } from "./types";
import { Button, Input } from "component-ui";
import clsx from "clsx";
import { cva } from "class-variance-authority";
import FolderIcon from "../assets/icons/FolderIcon";

const itemVariation = cva("select--item", {
  variants: {
    disabled: { true: "select--item-disabled", false: null },
  },
});

export const Select = React.forwardRef<SelectRef, Partial<ISelectProps>>(
  ({ options: propOptions = [], placeholder = "Select", ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState(propOptions ?? []);
    const [selectedValue, setSelectedValue] = useState<ISelectOptionProps>(
      options?.find((e) => e.value === props.value) ?? {
        label: placeholder,
        value: "",
      }
    );
    const [inputvalue, setInputValue] = useState("");
    const [currentIndex, setCurrentIndex] = useState(5);
    const [dropdownPosition, setDropdownPosition] = useState<
      ISelectProps["position"]
    >(props.position ?? "bottom");
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);
    useImperativeHandle(
      ref,
      () => {
        return {
          focus() {
            triggerRef.current?.focus();
          },
          blur() {
            triggerRef.current?.blur();
          },
        };
      },
      []
    );

    const updateDropdownPosition = () => {
      if (!triggerRef.current || !dropdownRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight + 10;

      const spaceBelow = window.innerHeight - triggerRect.bottom;
      // const spaceAbove = triggerRect.top;

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

    // Handle selection
    const handleSelect = (option: ISelectOptionProps) => {
      if (option.disabled) return;
      setInputValue("");
      setOptions(propOptions);
      setSelectedValue(option);
      setIsOpen(false);
      props.onSelect?.(option.value);
    };

    const handleKeyDown: React.KeyboardEventHandler = (event) => {
      if (event.key === "ArrowDown") {
        setCurrentIndex((prevIndex) =>
          Math.min(prevIndex + 1, options.length - 1)
        );
      } else if (event.key === "ArrowUp") {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (event.key === "Enter") {
        setSelectedValue(options[currentIndex]);
      }
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
      if (dropdownRef.current) {
        const currentItem = dropdownRef.current.children[currentIndex];
        if (currentItem) {
          currentItem.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }
    }, [currentIndex]);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    return (
      <div className="component-ui-style select--container" ref={containerRef}>
        <div
          className={clsx("select--trigger", {
            "select--trigger-disabled": props.disabled,
          })}
          onClick={() => {
            if (!props.disabled) {
              isOpen && triggerRef.current?.blur();
              setIsOpen((prev) => !prev);
            }
          }}
          tabIndex={0}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <Input
            ref={triggerRef}
            placeholder={selectedValue.label}
            className={clsx("select--trigger-input", {
              "select--trigger-placeholder": selectedValue.label,
            })}
            // value={inputvalue}
            disabled={props.disabled}
            onMouseDown={(e) => !props.search && e.preventDefault()}
            onChange={(e) => {
              // setInputValue(e.target.value);
              if (props.onSearch) {
                props.onSearch(e.target.value);
              } else {
                setOptions([
                  ...propOptions?.filter((v) =>
                    v.label.includes(e.target.value)
                  ),
                ]);
              }
            }}
            onBlur={() => {
              setInputValue(selectedValue.label);
              setOptions(propOptions);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                dropdownRef.current?.focus();
                dropdownRef.current?.scrollTo({ top: 0 });
              }
            }}
          />
        </div>
        <div
          className={clsx(
            `select--menu`,
            props.classes?.popup,
            `select--menu-${dropdownPosition}`,
            {
              open: isOpen,
            }
          )}
          onKeyDown={handleKeyDown}
          onBlur={() => setCurrentIndex(0)}
        >
          {options.length < 1 ? (
            <span className="select--options-container">
              <FolderIcon className="select--options-container-placeholder" />
              <p>No Data</p>
            </span>
          ) : (
            <ul
              ref={dropdownRef}
              tabIndex={0}
              role="listbox"
              className="select--menu-list"
            >
              {options?.map((option, index) => (
                <Button
                  onClick={() => {
                    if (!option.disabled) handleSelect(option);
                  }}
                  asChild
                  key={index}
                  onMouseEnter={() => {
                    setCurrentIndex(index);
                  }}
                  variant={
                    option.value === selectedValue.value ? "primary" : "text"
                  }
                  theme="#2d2c2c"
                  className={clsx("select--menu-button", {
                    // "select--menu-button-active": index === currentIndex,
                  })}
                  size="large"
                  disabled={option.disabled}
                  role="option"
                  // aria-current={index === currentIndex}
                >
                  <li
                    tabIndex={1}
                    className={itemVariation({ disabled: option.disabled })}
                  >
                    {option.label}
                  </li>
                </Button>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
