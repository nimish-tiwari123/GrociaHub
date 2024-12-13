import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./pages/user/routes/UserRoutes";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
  