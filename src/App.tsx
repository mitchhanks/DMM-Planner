import { Routes, Route, Navigate, Link } from "react-router-dom";
import { PlanPage } from "./pages/PlanPage";
import { RunPage } from "./pages/RunPage";

export default function App() {
  return (
    <div>
      {/* Tiny top nav */}
      <div style={{ padding: 12, display: "flex", gap: 8 }}>
        <Link className="osrs-button" to="/plan">Plan</Link>
        <Link className="osrs-button" to="/run">Run</Link>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/plan" replace />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/run" element={<RunPage />} />
      </Routes>
    </div>
  );
}
