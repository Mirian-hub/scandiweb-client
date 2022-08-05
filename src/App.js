import logo from "./logo.svg";
import "./App.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import AppBar from "./Comonents/AppBar";

function App() {
  return (
    <>
      <BrowserRouter>
      <AppBar/>
        <main>
          <Routes />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
