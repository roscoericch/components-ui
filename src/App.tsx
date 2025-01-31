/** @jsxImportSource @emotion/react */
import { useState } from "react";
import "./App.css";
import {
  Button,
  Input,
  Accordion,
  Dropdown,
  Label,
  CheckBox,
  Modal,
  Radio,
  Select,
} from "../lib/main";
import User from "../lib/assets/icons/User";
import { itemProps } from "../lib/dropdown/types";
import { RadioGroup } from "../lib/radio/Radio";
import { css } from "@emotion/react";

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
function App() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* <Select
        options={[
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
          { label: "optiong", value: "optiong" },
          { label: "optionh", value: "optionh" },
          { label: "optionj", value: "optionj" },
        ]}
        search
      /> */}
      <h1>Vite + React</h1>
      <Accordion items={items} />
      <Label htmlFor="label">Label</Label>
      <Input
        id="label"
        size="small"
        // variant="filled"
        // prefix={<User />}
        placeholder="Placeholder"
        // suffix={<User />}
        // disabled
        type="checkbox"
      />
      <div className="card">
        <Button
          variant="text"
          theme="#4aef1c"
          // ghost
          onClick={() => setOpen(true)}
          // disabled
          // asChild
        >
          <a href="#">
            <span>
              <p>count is {count}</p>
            </span>
          </a>
        </Button>
        <Dropdown trigger={["click"]} options={dropdown_items}>
          <Button
            variant="primary"
            theme="#ede618"
            onClick={() => setCount((count) => count + 1)}
            // loading={true}
          >
            count is {count}
          </Button>
        </Dropdown>
        <CheckBox children="Check" />
        <CheckBox children="Check2" />
        <Modal
          closeable
          centered
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        >
          modal content
        </Modal>
        <RadioGroup onChange={(e) => console.log(e.target)}>
          <Radio value="1">option 1</Radio>
          <Radio value="2">option 2</Radio>
        </RadioGroup>
        <Radio value={"2"} children="single radio" />
        <Select
          options={[
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
          ]}
          // search
        />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <div
          css={css({
            margin: 10,
            padding: 10,
            backgroundColor: "#eee",
          })}
        >
          Hover to change color.
        </div>
      </div>
    </>
  );
}

export default App;
