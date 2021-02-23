import React, { useState } from "react";

// export default function FilterButtons({ value, options = [], onChange }: Props) {
//   return (
//     <div className="filter-nav no-select">
//       {options.map((option) => (
//         <label
//           onClick={() => onChange(option.id)}
//           className={"chip c-hand" + (value + "" === option.id + "" ? " active" : "")}
//         >
//           {option.title}
//         </label>
//       ))}
//     </div>
//   );
// }
export default function FilterButtons({ value, options = [], onChange }: Props) {
  return (
    <div className="btn-group">
      {options.map((option) => (
        <button
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
