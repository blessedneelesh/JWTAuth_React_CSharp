import logo from "./logo.svg";
import "./App.css";

import Routes from "./routes";
import AuthProvider from "./provider/AuthProvider";
import { Footer } from "./components";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
