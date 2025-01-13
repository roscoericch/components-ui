import { useState } from "react";
import "./App.css";
import { Button, Input, Accordion, Dropdown } from "../lib/main";
import User from "../lib/assets/icons/User";
import { itemProps } from "../lib/dropdown/types";

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

  return (
    <>
      <h1>Vite + React</h1>
      <Accordion items={items} />
      <Input.Password
        size="small"
        variant="filled"
        prefix={<User />}
        placeholder="Placeholder"
        // suffix={<User />}
        // disabled={true}
      />
      <div className="card">
        <Button
          variant="text"
          theme="#df0909"
          // ghost
          onClick={() => setCount((count) => count + 1)}
          disabled
          // asChild
        >
          <a href="#">
            <span>
              <p>count is {count}</p>
            </span>
          </a>
        </Button>
        <Dropdown trigger={["hover"]} options={dropdown_items}>
          <Button
            variant="primary"
            theme="#df0909"
            onClick={() => setCount((count) => count + 1)}
            // loading={true}
          >
            count is {count}
          </Button>
        </Dropdown>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
