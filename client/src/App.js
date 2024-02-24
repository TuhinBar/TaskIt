import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Pages/Login/index";
import Tasks from "./Pages/Tasks";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<h1>dashboard</h1>} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}

export default App;
