// import logo from "./logo.svg";
import "./App.css";

function App() {
  const date = new Date();
  const time = date.toLocaleTimeString();
  return (
    <div className="App">
      {time}
    </div>
  );
}

export default App;
