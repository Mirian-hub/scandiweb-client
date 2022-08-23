import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppBar from "./Comonents/AppBar";
import AppContent from "./Comonents/AppContent";

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
