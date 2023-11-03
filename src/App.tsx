import SelectControl from "./components/InputControl/Select";
import InputControl from "./components/InputControl/Input";
import TextAreaControl from "./components/InputControl/Textarea";

function App() {
  return (
    <div>
      <TextAreaControl />
      <InputControl />
      <SelectControl>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </SelectControl>
    </div>
  );
}

export default App;
