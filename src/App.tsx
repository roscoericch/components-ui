import { useState } from "react";
import "./App.css";
import { Button, Input } from "../lib/main";
import User from "../lib/assets/icons/User";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <Input
        size="small"
        variant="filled"
        prefix={<User />}
        placeholder="Placeholder"
        suffix={<User />}
        disabled={true}
      />
      <div className="card">
        <Button
          variant="primary"
          theme="#df0909"
          ghost
          onClick={() => setCount((count) => count + 1)}
          disabled
        >
          count is {count}
        </Button>
        <Button
          variant="outlined"
          theme="#df0909"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
