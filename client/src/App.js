import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Pages/Login/index";
import Teams from "./Pages/Teams";
import { teamSelector } from "./store/slices/teamSlice";
import { useSelector } from "react-redux";

function App() {
  const { teams } = useSelector(teamSelector);
  const firstTeamId = teams[0]?._id;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Login/>} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<h1>dashboard</h1>} />
        <Route
          path="/teams"
          element={<Navigate to={`/teams/${firstTeamId}`} />}
        />
        <Route path="/teams/:slug" element={<Teams />} />
      </Route>
    </Routes>
  );
}

export default App;
