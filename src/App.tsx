import Button from "./components/Button/Button";
import PrintAfter from "./components/PrintAfter/PrintAfter";

function App() {
  return (
    <div>
      <PrintAfter>
        <Button className="submit">Hola Mundo</Button>
      </PrintAfter>
    </div>
  );
}

export default App;
