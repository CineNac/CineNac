import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import BaseTable from "./components/BaseTable";
import BaseDoce from "./components/Doce";
import BaseMenu from "./components/Menu";
import BaseTableFunc from "./components/BaseTableFunc";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <br />
      <BaseMenu></BaseMenu>
      <br />
      <br />
      <BaseTable></BaseTable>
      <BaseDoce></BaseDoce>
     <BaseTableFunc></BaseTableFunc>

    </div>
  );
}

export default App;
