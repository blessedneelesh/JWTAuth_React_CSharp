import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components";
import Routes from "./routes";
import AuthProvider from "./provider/AuthProvider";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
