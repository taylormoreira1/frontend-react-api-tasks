import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Task from "./pages/Tasks";
import Register from "./pages/Register";
import { RouteAuthorization } from "./components/RouteAuthorization";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/tarefas" element={
            <RouteAuthorization>
              <Task />
            </RouteAuthorization>}
          />
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
