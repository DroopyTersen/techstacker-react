import React from "react";

export default function FilterButtons({ value, options = [], onChange }: Props) {
  return (
    <div className="btn-group">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => {
            // Allow click to deselect
            if (value + "" === option.id + "") {
              onChange("");
            } else {
              onChange(option.id);
            }
          }}
          className={"btn btn-small c-hand" + (value + "" === option.id + "" ? " active" : "")}
        >
          {option.title}
        </button>
      ))}
    </div>
  );
}
interface Props {
  value: string | number;
  options: { title: string; id: string | number }[];
  onChange: (value: string | number) => void;
}
