import "./accordion.css";
import React, { useState } from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import ArrowRightIcon from "../assets/icons/ArrowRightIcon";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  key: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  size?: "small" | "medium" | "large";
  borderless?: boolean;
  iconPosition?: "start" | "end" | "no-arrow";
  ghost?: boolean;
}

const accordionVariants = cva("accordion component-ui-style", {
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

export const Accordion = ({
  items,
  allowMultiple = false,
  size,
  borderless,
  ghost,
  iconPosition = "start",
}: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<string[]>([]);

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
            className={clsx("accordion--content", {
              "accordion--open": openIndexes.includes(item.key),
            })}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

const items = [
  {
    title: "Section 1",
    content: (
      <span>
        A dog is a type of domesticated animal.Known for its loyalty and
        faithfulness,it can be found as a welcome guest in many households
        across the world.
      </span>
    ),
    key: "1",
  },
  {
    title: "Section 2",
    content: (
      <p>
        A dog is a type of domesticated animal.Known for its loyalty and
        faithfulness,it can be found as a welcome guest in many households
        across the world.
      </p>
    ),
    key: "2",
  },
  {
    title: "Section 3",
    content: (
      <p>
        A dog is a type of domesticated animal.Known for its loyalty and
        faithfulness,it can be found as a welcome guest in many households
        across the world.
      </p>
    ),
    key: "3",
  },
];

const Test = (props: Omit<AccordionProps, "items">) => {
  return <Accordion {...props} items={items} />;
};
Accordion.Test = Test;

export default Accordion;
