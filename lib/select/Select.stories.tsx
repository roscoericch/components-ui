import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "component-ui";
import { ISelectOptionProps } from "./types";
const items: ISelectOptionProps<string>[] = [
  { label: "label", value: "value" },
  { label: "option", value: "option" },
  { label: "option1", value: "option1" },
  { label: "option2", value: "option2" },
  { label: "option3", value: "option3" },
  { label: "option4", value: "option4" },
  { label: "option5", value: "option5" },
  { label: "option6", value: "option6" },
  { label: "option7", value: "option7" },
  { label: "option8", value: "option8" },
  { label: "option9", value: "option9" },
  { label: "optiona", value: "optiona" },
  { label: "options", value: "options" },
  { label: "optiond", value: "optiond" },
  { label: "optionf", value: "optionf" },
  { label: "optiong", value: "optiong", disabled: true },
  { label: "optionh", value: "optionh" },
  { label: "optionj", value: "optionj", disabled: true },
];
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Ui/Select",
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    options: { control: false },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    options: items,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
