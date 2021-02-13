import { useState, useEffect } from "react";
import { useDebouncedValue } from "./useDebounce";

export default function useDebouncedInputValue(
  value: string,
  onChange: (newVal: string) => void,
  delay = 250
) {
  let [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  let debouncedValue = useDebouncedValue(inputValue, delay);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return [inputValue, setInputValue, debouncedValue] as [
    string,
    React.Dispatch<React.SetStateAction<string>>,
    string
  ];
}
