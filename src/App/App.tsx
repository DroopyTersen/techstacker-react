import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./AppDataProvider";
import * as TechScreens from "../Tech/tech.screens";
import Header from "./layout/Header";
import "./app.css";

export default function App() {
  return (
    <Router>
      <AppDataProvider>
        <Header />
        <main>
          <Routes>
            <Route path="*" element={<h1>Home</h1>}></Route>
            <Route path="/tech/new" element={<TechScreens.NewTechScreen />}></Route>
          </Routes>
        </main>
      </AppDataProvider>
    </Router>
  );
}
