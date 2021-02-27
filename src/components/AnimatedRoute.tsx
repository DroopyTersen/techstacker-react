import { motion } from "framer-motion";
import React from "react";
import { Route } from "react-router-dom";

export default function AnimatedRoute({ path, element, children = undefined, ...props }) {
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
