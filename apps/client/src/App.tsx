import { Route, Routes } from "react-router";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";

function App() {
  return (
    <Routes>
      <Route path="auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
