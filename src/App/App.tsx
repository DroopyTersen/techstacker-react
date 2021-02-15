import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./AppDataProvider";
import * as TechScreens from "../Tech/tech.screens";
import * as LayerScreens from "../Layers/layers.screens";
import * as CategoryScreens from "../Categories/category.screens";
import * as StackScreens from "../Stacks/stack.screens";

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
                element={
                  <>
                    <LayerScreens.LayersScreen />
                    <div style={{ margin: "80px 0" }} />
                    <StackScreens.StacksScreen limit={3} />
                    <div style={{ margin: "80px 0" }} />
                    <TechScreens.TechScreen limit={6} />
                  </>
                }
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
                path="/stacks"
                key="/stacks"
                element={<StackScreens.StacksScreen />}
              ></AnimatedRoute>
              <AnimatedRoute
                path="/stacks/new"
                key="/stacks/new"
                element={<StackScreens.NewStackScreen />}
              ></AnimatedRoute>
              <AnimatedRoute
                path="/stacks/:stackId"
                key="/stacks/:stackId"
                element={<StackScreens.StackDetailsScreen />}
              ></AnimatedRoute>
              <AnimatedRoute
                path="/stacks/:stackId/edit"
                key="/stacks/:stackId/edit"
                element={<StackScreens.EditStackScreen />}
              ></AnimatedRoute>

              <AnimatedRoute
                path="/layers"
                element={<LayerScreens.LayersScreen />}
                key="/layers"
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
