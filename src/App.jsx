import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import ArchitectAI from "./pages/ArchitectAI";
import Prospects from "./pages/Prospects";
import Newsletters from "./pages/Newsletters";
import Systems from "./pages/Systems";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/architect-ai" element={<ArchitectAI />} />
        <Route path="/prospects" element={<Prospects />} />
        <Route path="/newsletters" element={<Newsletters />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </AppLayout>
  );
}
