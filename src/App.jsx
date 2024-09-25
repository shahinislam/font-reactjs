import React from "react";
import FontUpload from "./pages/font-upload";
import FontGroup from "./pages/font-group";
// import FontList from "./pages/font-list";
import Navbar from "./components/Navbar";
import Layout from "./components/layout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<FontUpload />} />
          <Route path="/font-group" element={<FontGroup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
