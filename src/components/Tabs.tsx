import React, { useEffect, useState } from "react";

export default function Tabs<T>({ value, options = [], onChange, ...rest }: Props<T>) {
  useEffect(() => {
    if (!value && options.length) {
      onChange(options[0].id);
    }
  }, [options, value]);

  return (
    <ul className="tab tab-block mb-2" {...rest}>
      {options.map((option) => (
        <li className={"tab-item " + (value === option.id ? "active" : "")}>
          <a
            className="text-bold"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onChange(option.id);
            }}
          >
            {option.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
interface Props<T> {
  value: T;
  options: { title: string; id: T }[];
  onChange: (value: T) => void;
  [key: string]: any;
}
