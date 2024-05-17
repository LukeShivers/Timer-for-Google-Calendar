import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Timer from "./pages/Timer.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Pulic Route */}
        <Route path="/" element={<Home />} />

        {/* Private Route */}
        <Route element={<RequireAuth />}>
          <Route path="/timer" element={<Timer />} />
        </Route>
      </Route>
    </Routes>
  );
}
