import Button from "./components/Button/Button";
import InputControl from "./components/InputControl/Input";

function App() {
  return (
    <div>
      <h2>Buttons</h2>
      <div>
        <h3>Primary</h3>
        <div className="flex gap-5">
          <Button className="primary">Text Button</Button>
          <Button className="primary submit">Submit Button</Button>
          <Button className="primary outlined">Outlined Button</Button>
        </div>
        <h3>Secondary</h3>
        <div className="flex gap-5">
          <Button className="secondary">Text Button</Button>
          <Button className="secondary submit">Submit Button</Button>
          <Button className="secondary outlined">Outlined Button</Button>
        </div>
        <h3>Ternary</h3>
        <div className="flex gap-5">
          <Button className="ternary">Text Button</Button>
          <Button className="ternary submit">Submit Button</Button>
          <Button className="ternary outlined">Outlined Button</Button>
        </div>
      </div>
      <h2>Inputs</h2>
      <div className="flex gap-5">
        <InputControl label="default" />
        <InputControl label="primary" color="primary" />
        <InputControl label="secondary" color="secondary" />
        <InputControl label="ternary" color="ternary" />
      </div>
    </div>
  );
}

export default App;
