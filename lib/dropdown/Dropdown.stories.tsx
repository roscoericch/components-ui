import type { Meta, StoryObj } from "@storybook/react";

import { Button, Dropdown } from "component-ui";
import User from "../assets/icons/User";
import { itemProps } from "./types";
const dropdown_items: itemProps[] = [
  {
    label: <span>cat item (disabled)</span>,
    key: "1",
    icon: <User />,
    disabled: true,
  },
  {
    label: <p>dog item (danger)</p>,
    key: "2",
    destructive: true,
  },
  {
    label: <p style={{ color: "blue" }}>spoon item</p>,
    key: "3",
  },
];
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Ui/Dropdown",
  component: Dropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    trigger: { control: "check", options: ["hover", "click"] },
    options: { control: false },
    children: { control: false },
    classes: { control: false },
    style: { control: false },
    open: { control: false },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    options: dropdown_items,
    trigger: ["hover"],
    open: false,
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: <Button>Trigger</Button>,
  },
};
