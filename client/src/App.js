import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from "./pages";

function App() {
  return (
    <div className="w-full">
      <Router>
        <Pages />
      </Router>
    </div>
  );
}

export default App;
