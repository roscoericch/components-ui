import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./Button";
import User from "../assets/icons/User";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Ui/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    theme: { control: "color" },
    spinProps: { control: false },
    icon: { control: false },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn(), destructive: false, loading: false, ghost: false },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Button",
    disabled: false,
    ghost: false,
  },
};

export const Default: Story = {
  args: {
    label: "Button",
    variant: "default",
    disabled: false,
    ghost: false,
  },
};

export const Outlined: Story = {
  args: {
    label: "Button",
    variant: "outlined",
    disabled: false,
    ghost: false,
  },
};

export const Destructive: Story = {
  args: {
    label: "Button",
    variant: "primary",
    disabled: false,
    ghost: false,
  },
};

export const Icon: Story = {
  args: {
    variant: "primary",
    icon: <User strokeWidth={3} stroke="#FFF" />,
    label: "Button",
  },
};

export const Loading: Story = {
  args: {
    label: "Button",
    variant: "primary",
    disabled: false,
    ghost: false,
    loading: true,
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
