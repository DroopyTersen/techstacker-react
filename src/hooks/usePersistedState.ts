import React, { useState, useEffect } from "react";

export default function usePersistedState<T>(
  key: string,
  defaultValue: T,
  storage = window.localStorage
) {
  let [value, setValue] = useState<T>(() => {
    try {
      let cachedValue = storage.getItem(key);
      console.log("🚀 | cachedValue", cachedValue);
      if (!cachedValue) return defaultValue;
      return JSON.parse(cachedValue);
    } catch (err) {
      return defaultValue;
    }
  });

  useEffect(() => {
    let valueStr = typeof value === "string" ? value : JSON.stringify(value);
    storage.setItem(key, valueStr);
  }, [key, value]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
