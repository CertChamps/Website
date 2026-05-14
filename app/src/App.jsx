import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  );
}
