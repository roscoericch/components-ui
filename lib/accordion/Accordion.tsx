import React, { useRef, useState } from "react";
import "./accordion.css";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import ArrowRightIcon from "../assets/icons/ArrowRightIcon";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  key: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  size?: "small" | "medium" | "large";
  borderless?: boolean;
  iconPosition?: "start" | "end" | "no-arrow";
  ghost?: boolean;
}

const accordionVariants = cva("accordion base-style", {
  variants: {
    size: {
      small: "accordion--small",
      medium: "accordion--medium",
      large: "accordion--large",
    },
    ghost: {
      true: "accordion--ghost",
      false: null,
    },
    borderless: {
      true: "accordion--borderless",
      false: null,
    },
  },
  defaultVariants: {
    size: "medium",
  },
  compoundVariants: [],
});

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  size,
  borderless,
  ghost,
  iconPosition = "start",
}) => {
  const [openIndexes, setOpenIndexes] = useState<string[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleIndex = (index: string) => {
    setOpenIndexes((prevIndexes) => {
      if (allowMultiple) {
        // Toggle the index for multiple allowed
        return prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index)
          : [...prevIndexes, index];
      } else {
        // Only allow one open at a time
        return prevIndexes.includes(index) ? [] : [index];
      }
    });
  };

  const getMaxHeight = (index: number) => {
    const content = contentRefs.current[index];
    return content ? `${content.scrollHeight}px` : "0px";
  };

  return (
    <div className={clsx(accordionVariants({ size, borderless, ghost }))}>
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className="accordion--title"
            onClick={() => toggleIndex(item.key)}
            aria-expanded={openIndexes.includes(item.key)}
            role="button"
          >
            {iconPosition === "start" && (
              <ArrowRightIcon
                className={clsx("accordion--chevron", {
                  "accordion--chevron-open": openIndexes.includes(item.key),
                })}
              />
            )}
            <span className="accordion--title-content">{item.title}</span>
            {iconPosition === "end" && (
              <ArrowRightIcon
                className={clsx("accordion--chevron", {
                  "accordion--chevron-open": openIndexes.includes(item.key),
                })}
              />
            )}
          </div>
          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className={clsx("accordion--content", {
              "accordion--open": openIndexes.includes(item.key),
            })}
            style={{
              maxHeight: openIndexes.includes(item.key)
                ? getMaxHeight(index)
                : "0px",
              opacity: openIndexes.includes(item.key) ? 1 : 0,
              transform: openIndexes.includes(item.key)
                ? "scaleY(1)"
                : "scaleY(0.95)",
              transition:
                "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
