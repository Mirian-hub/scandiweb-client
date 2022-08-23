import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppBar from "./scenes/AppBar";
import AppContent from "./scenes/AppContent";

function App() {
  return (
    <>
      <BrowserRouter>
      <AppBar/>
      <AppContent/>
      </BrowserRouter>
    </>
  );
}

export default App;
