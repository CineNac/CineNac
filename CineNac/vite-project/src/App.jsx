import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import BaseTable from "./components/BaseTable";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BaseTable></BaseTable>
    </div>
  );
}

export default App;
