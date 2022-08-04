import logo from "./logo.svg";
import "./App.css";
import AppLayout from "./Comonents/AppLayout";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
