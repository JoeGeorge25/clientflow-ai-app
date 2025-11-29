import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ChatPage from "./pages/chat.jsx";
import Prospects from "./pages/Prospects.jsx";
import Newsletters from "./pages/Newsletters.jsx";
import Systems from "./pages/Systems.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/prospects" element={<Prospects />} />
          <Route path="/newsletters" element={<Newsletters />} />
          <Route path="/systems" element={<Systems />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
