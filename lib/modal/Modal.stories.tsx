import type { Meta, StoryObj } from "@storybook/react";

import { Button, Modal } from "component-ui";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Ui/Modal",
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  decorators: [
    (Story) => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Story
            args={{
              open: open,
              maskClosable: true,
              closeable: true,
              onClose: () => {
                setOpen(false);
              },
              children: "Modal Content",
              centered: true,
            }}
          />
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Trigger
          </Button>
        </>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {};
