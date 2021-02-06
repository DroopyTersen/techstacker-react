import React, { useState, useEffect } from "react";
import useS from "@hooks/usePersistedState";

export default function App() {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Update the count (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  return (
    <div>
      <h1>Hi From App! and I've updated</h1>
      <p>
        Count: <code>{count}</code>
      </p>
    </div>
  );
}
