import { useState } from "react";
import Switch from "./components/Switch/Switch";

function App() {
  const [switchV, setSwitch] = useState(false);
  return (
    <div>
      <Switch
        value={switchV}
        onChange={() => setSwitch((switchV) => !switchV)}
      />
    </div>
  );
}

export default App;
