import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from "./pages/modal";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Modal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
