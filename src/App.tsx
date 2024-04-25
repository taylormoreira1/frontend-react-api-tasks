// App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Task from "./pages/Tasks";
import Register from "./pages/Register";
import ProtectedRoute from "./contexts/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tarefas" element={<ProtectedRoute><Task /></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
