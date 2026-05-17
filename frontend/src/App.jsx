import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Tasks from "./pages/Tasks";
import Upload from "./pages/Upload";
import MeetingDetails from "./pages/MeetingDetails";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      <Route path="/meetings" element={<ProtectedRoute><Meetings /></ProtectedRoute>} />

      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />

      <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />

      <Route path="/meetings/:id" element={<ProtectedRoute><MeetingDetails /></ProtectedRoute>} />

    </Routes>
  );
}

export default App;