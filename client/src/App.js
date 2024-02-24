import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<h1>API running...</h1>} />
        <Route path="/tasks" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
