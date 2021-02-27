import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./AppDataProvider";
import * as TechScreens from "../Tech/tech.screens";
import * as LayerScreens from "../Layers/layers.screens";
import * as StackScreens from "../Stacks/stack.screens";

import Header from "./layout/Header";
import { AnimatePresence } from "framer-motion";
import "./app.css";
import TechResults from "../Tech/components/TechResults";
import AnimatedRoute from "@components/AnimatedRoute";

export default function App() {
  return (
    <Router>
      <AppDataProvider>
        <Header />
        <main>
          <AnimatePresence>
            <Routes>
              {/* <AnimatedRoute path="*" element={<h1>Home</h1>} key="home"></AnimatedRoute> */}
              <AnimatedRoute path="*" element={<HomeScreen />} key="home"></AnimatedRoute>
              <AnimatedRoute
                path="/tech"
                element={
                  <TechScreens.TechScreen title="Web Tech">
                    <TechResults />
                  </TechScreens.TechScreen>
                }
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
            </Routes>
          </AnimatePresence>
        </main>
      </AppDataProvider>
    </Router>
  );
}

const HomeScreen = () => {
  return (
    <>
      <LayerScreens.LayersScreen />
      <div style={{ margin: "80px 0" }} />
      <StackScreens.StacksScreen limit={3} />
      <div style={{ margin: "80px 0" }} />
      <TechScreens.TechScreen title="Recent Tech">
        <TechResults limit={6} sortKey="created_at" sortDir="desc" showControls={false} />
      </TechScreens.TechScreen>
    </>
  );
};
