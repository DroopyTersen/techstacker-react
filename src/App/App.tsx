import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import * as TechScreens from "../Tech/tech.screens";
import * as LayerScreens from "../Layers/layers.screens";
import * as StackScreens from "../Stacks/stack.screens";
import * as AuthScreens from "../auth/auth.screens";

import Header from "./layout/Header";
import { AnimatePresence } from "framer-motion";
import "./app.css";
import TechResults from "../Tech/components/TechResults";
import AnimatedRoute from "@components/AnimatedRoute";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../common/gql";
import HomeScreen from "./HomeScreen";

export default function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>
          <AnimatePresence>
            <Routes>
              {/* <AnimatedRoute path="*" element={<h1>Home</h1>} key="home"></AnimatedRoute> */}
              <AnimatedRoute path="*" element={<HomeScreen />} key="home"></AnimatedRoute>

              <AnimatedRoute path="/login" element={<AuthScreens.LoginScreen />} key="login" />
              <AnimatedRoute path="/logout" element={<AuthScreens.LogoutScreen />} key="logout" />
              <AnimatedRoute
                path="/auth/microsoft"
                element={<AuthScreens.MicrosoftAuthCallback />}
                key="/auth/microsoft"
              />
              <AnimatedRoute
                path="/auth/auth0"
                element={<AuthScreens.GithubAuthCallback />}
                key="/auth/auth0"
              />
              <AnimatedRoute
                path="/currentUser"
                element={<AuthScreens.CurrentUserScreen />}
                key="currentuser"
              />
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
                element={<TechScreens.TechFormScreen title="New Tech" />}
              ></AnimatedRoute>
              <AnimatedRoute
                path="/tech/:techId/edit"
                element={<TechScreens.TechFormScreen title="Edit Tech" />}
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
                element={<StackScreens.StackFormScreen title="New Stack" />}
              ></AnimatedRoute>
              <AnimatedRoute
                path="/stacks/:stackId"
                key="/stacks/:stackId"
                element={<StackScreens.StackDetailsScreen />}
              ></AnimatedRoute>
              <AnimatedRoute
                path="/stacks/:stackId/edit"
                key="/stacks/:stackId/edit"
                element={<StackScreens.StackFormScreen title="Edit Stack" />}
              ></AnimatedRoute>

              <AnimatedRoute
                path="/layers"
                element={<LayerScreens.LayersScreen />}
                key="/layers"
              ></AnimatedRoute>
            </Routes>
          </AnimatePresence>
        </main>
      </QueryClientProvider>
    </Router>
  );
}
