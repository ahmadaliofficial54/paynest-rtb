import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auction from "./pages/Auction";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auction/:id" element={<Auction />} />
    </Routes>
  );
}
