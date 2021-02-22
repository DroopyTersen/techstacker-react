import FilterButtons from "@components/FilterButtons";
import { Row } from "@components/layout";
import { useQueryParams } from "@hooks/useQueryParams";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Category, Layer } from "../../App/AppDataProvider";

function TechFilters(props: TechFiltersProps) {
  console.log("🚀 | TechFilters | props", props);
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
  let activeCategoryId = queryParams.get("categoryId") || "";
  let activeCategory =
    activeCategoryId && props.categories.find((c) => c.id + "" === activeCategoryId);

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
        <FilterButtons
          options={[{ id: "", title: "All" }, ...props.layers]}
          value={queryParams.get("layerId") || ""}
          onChange={(val) => updateUrl("layerId", val)}
        />
        <div>
          {activeTag && (
            <span className="chip active mr-2">
              {activeTag}
              <button
                type="button"
                className="btn btn-clear"
                onClick={() => updateUrl("tag", "")}
              ></button>
            </span>
          )}
          {activeCategory && (
            <span className="chip active mr-2">
              {activeCategory.title}
              <button
                type="button"
                className="btn btn-clear"
                onClick={() => updateUrl("categoryId", "")}
              ></button>
            </span>
          )}
        </div>
        {/* <div className="input-group pt-2">
          <span className="input-group-addon">Category</span>
          <select
            className="form-select"
            style={{ flex: "0 1 auto" }}
            value={queryParams.get("categoryId") || ""}
            onChange={(e) => updateUrl("categoryId", e.currentTarget.value)}
          >
            <option value="">All</option>
            {(props.categories || []).map((c) => (
              <option value={c.id}>{c.title}</option>
            ))}
          </select>
        </div> */}
      </div>
      <div className="input-group">
        <span className="input-group-addon">Sort</span>
        <select
          className="form-select"
          value={queryParams.get("sortKey") || ""}
          onChange={(e) => updateSort(e.currentTarget.value)}
        >
          <option value="">Stack Position</option>
          <option value="title">Title</option>
          <option value="created_at">Recent</option>
        </select>
      </div>
    </Row>
  );
}

export default React.memo(TechFilters);

export interface TechFiltersProps {
  layers: Layer[];
  categories: Category[];
}
