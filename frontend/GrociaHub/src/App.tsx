import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./pages/user/routes/UserRoutes";
import AuthRoutes from "./pages/auth/routes/AuthRoutes";
import {HomeLayout} from "./layout";
import { NotFound } from "./components/common"; 
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/*" element={<UserRoutes />} />
        </Route>

        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
