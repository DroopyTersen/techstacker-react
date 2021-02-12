import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./AppDataProvider";
import * as TechScreens from "../Tech/tech.screens";
import * as LayerScreens from "../Layers/layers.screens";
import * as CategoryScreens from "../Categories/category.screens";

import Header from "./layout/Header";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";
import "./app.css";

export default function App() {
  return (
    <Router>
      <AppDataProvider>
        <Header />
        <main>
          <AnimatePresence>
            <Routes>
              {/* <AnimatedRoute path="*" element={<h1>Home</h1>} key="home"></AnimatedRoute> */}
              <AnimatedRoute
                path="*"
                element={<TechScreens.TechScreen />}
                key="home"
              ></AnimatedRoute>
              <AnimatedRoute
                path="/tech"
                element={<TechScreens.TechScreen />}
                key="/tech"
              ></AnimatedRoute>
              <AnimatedRoute
                path="/tech/:techId"
                element={<TechScreens.TechDetailsScreen />}
                key="/tech/techId"
              ></AnimatedRoute>
              <AnimatedRoute
                path="/tech/new"
                key="/tech/new"
                element={<TechScreens.NewTechScreen />}
              ></AnimatedRoute>
              <AnimatedRoute
                path="/tech/:techId/edit"
                element={<TechScreens.EditTechScreen />}
                key="/tech/:techId/edit"
              ></AnimatedRoute>

              <AnimatedRoute
                path="/layers/:layerId"
                element={<LayerScreens.LayerDetailsScreen />}
                key="/layers/:layerId"
              ></AnimatedRoute>

              <AnimatedRoute
                path="/categories"
                element={<CategoryScreens.CategoriesScreen />}
                key="/categories"
              ></AnimatedRoute>
              <AnimatedRoute
                path="/categories/:categoryId"
                element={<CategoryScreens.CategoryDetailsScreen />}
                key="/categories/:categoryId"
              ></AnimatedRoute>
            </Routes>
          </AnimatePresence>
        </main>
      </AppDataProvider>
    </Router>
  );
}

function AnimatedRoute({ path, element, children = undefined, ...props }) {
  return (
    <Route
      {...props}
      path={path}
      element={
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {element}
        </motion.div>
      }
    >
      {children}
    </Route>
  );
}
