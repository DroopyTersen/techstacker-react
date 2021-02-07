import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./AppDataProvider";
import * as TechScreens from "../Tech/tech.screens";
export default function App() {
  return (
    <Router>
      <AppDataProvider>
        <Routes>
          <Route path="*" element={<h1>Home</h1>}></Route>
          <Route path="/tech/new" element={<TechScreens.NewTechScreen />}></Route>
        </Routes>
      </AppDataProvider>
    </Router>
  );
}
