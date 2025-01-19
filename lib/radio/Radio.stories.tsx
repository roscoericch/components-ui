import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from "component-ui";
import { RadioGroup } from "./Radio";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Ui/Radio",
  component: Radio,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    children: { control: false },
    value: { control: false },
    className: { control: false },
  },
  args: { disabled: false, checked: false },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Radio",
  },
};

export const Group: Story = {
  decorators: [
    () => {
      return (
        <span>
          <RadioGroup style={{ display: "flex", gap: "5px" }}>
            <Radio value={"1"}>option 1</Radio>
            <Radio value={"2"}>option 2</Radio>
          </RadioGroup>
        </span>
      );
    },
  ],
  argTypes: { disabled: { control: false }, checked: { control: false } },
};
