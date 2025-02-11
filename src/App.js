import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import SignIn from "./components/auth/Signup";
import AllRoutes from "./components/routes/routes";

function App() {
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
