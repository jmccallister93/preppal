
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

const root = createRoot(document.getElementById("root"));

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
