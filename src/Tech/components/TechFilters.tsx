import FilterButtons from "@components/FilterButtons";
import { Row } from "@components/layout";
import { useDebouncedEffect } from "@hooks/useDebounce";
import { useQueryParams } from "@hooks/useQueryParams";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Category, Layer } from "../../App/AppDataProvider";

function TechFilters(props: TechFiltersProps) {
  console.log("🚀 | TechFilters | props", props);
  let [textFilter, setTextFilter] = useState("");

  useDebouncedEffect(
    (debouncedVal) => {
      updateUrl("filter", debouncedVal);
    },
    textFilter,
    300
  );

  let queryParams = useQueryParams();
  let { pathname } = useLocation();
  let navigate = useNavigate();

  let updateUrl = (param, value) => {
    if (!value) {
      queryParams.delete(param);
    } else {
      queryParams.set(param, value);
    }
    let qs = queryParams.toString();
    navigate(`${pathname}?${qs}`, { replace: true });
  };
  let activeTag = queryParams.get("tag") || "";
  let activeFilter = queryParams.get("filter") || "";

  let activeCategoryId = queryParams.get("categoryId") || "";
  let activeCategory =
    activeCategoryId && props.categories.find((c) => c.id + "" === activeCategoryId);

  let activeLayerId = queryParams.get("layerId") || "";
  let activeLayer = activeLayerId && props.layers.find((l) => l.id + "" === activeLayerId);

  let view = queryParams.get("view") || "card";

  let updateSort = (val) => {
    if (!val) {
      queryParams.delete("sortKey");
      queryParams.delete("sortDir");
    } else if (val === "created_at") {
      queryParams.set("sortKey", val);
      queryParams.set("sortDir", "desc");
    } else {
      queryParams.set("sortKey", val);
      queryParams.set("sortDir", "asc");
    }
    let qs = queryParams.toString();
    navigate(`${pathname}?${qs}`, { replace: true });
  };

  return (
    <Row justifyContent="space-between" className="mb-2 pb-2 pt-2">
      <div>
        {/* <FilterButtons
          options={props.layers}
          value={queryParams.get("layerId") || ""}
          onChange={(val) => updateUrl("layerId", val)}
        /> */}
        <div className="form-group tech-filter mt-2">
          <input
            className="form-input"
            placeholder="Filter..."
            value={textFilter}
            onChange={(e) => setTextFilter(e.currentTarget.value)}
          />
        </div>
      </div>
      <div>
        <div>
          <FilterButtons
            options={props.layers}
            value={queryParams.get("layerId") || ""}
            onChange={(val) => updateUrl("layerId", val)}
          />
        </div>
        <div>
          {activeLayer && (
            <span className="chip active mr-1 mt-2">
              {activeLayer.title}
              <button
                type="button"
                className="btn btn-clear"
                onClick={() => updateUrl("layerId", "")}
              ></button>
            </span>
          )}
          {activeCategory && (
            <span className="chip active mr-1 mt-2">
              {activeCategory.title}
              <button
                type="button"
                className="btn btn-clear"
                onClick={() => updateUrl("categoryId", "")}
              ></button>
            </span>
          )}
          {activeTag && (
            <span className="chip active mr-1 mt-2">
              {activeTag}
              <button
                type="button"
                className="btn btn-clear"
                onClick={() => updateUrl("tag", "")}
              ></button>
            </span>
          )}
          {activeFilter && (
            <span className="chip active mr-1 mt-2">
              {activeFilter}
              <button
                type="button"
                className="btn btn-clear"
                onClick={() => {
                  updateUrl("filter", "");
                  setTextFilter("");
                }}
              ></button>
            </span>
          )}
        </div>
      </div>

      <div>
        <div className="form-group">
          <label className="form-switch">
            <input
              type="checkbox"
              defaultChecked={view === "table"}
              onChange={(e) => updateUrl("view", e.currentTarget.checked ? "table" : "card")}
            />
            <i className="form-icon"></i> {view === "card" ? "Card view" : "Table view"}
          </label>
        </div>
        <div className="input-group">
          <span className="input-group-addon">Sort</span>
          <select
            className="form-select"
            value={queryParams.get("sortKey") || ""}
            onChange={(e) => updateSort(e.currentTarget.value)}
          >
            <option value="">Layer</option>
            <option value="title">Title</option>
            <option value="created_at">Recent</option>
          </select>
        </div>
      </div>
    </Row>
  );
}

export default React.memo(TechFilters);

export interface TechFiltersProps {
  layers: Layer[];
  categories: Category[];
}
