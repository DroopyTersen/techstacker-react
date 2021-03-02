import FilterButtons from "@components/FilterButtons";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Category, Layer } from "../../App/AppDataProvider";

import { Tech } from "../../Tech/tech.data";

export default function TechSelector({
  values,
  onChange,
  technologies,
  layers,
  categories,
}: Props) {
  let [activeLayer, setActiveLayer] = useState(() => (layers.length ? layers[0].id : 0));
  let [showAll, setShowAll] = useState(true);
  useEffect(() => {
    if (!activeLayer && layers.length) {
      setActiveLayer(layers[0].id);
    }
  }, [activeLayer, layers]);

  let toggleSelect = (id) => {
    if (values.includes(id)) {
      onChange(values.filter((v) => v !== id));
    } else {
      onChange([...values, id]);
    }
  };

  let itemsToShow = useMemo(() => {
    let result = technologies;
    if (activeLayer) {
      result = result.filter((tech) => tech.layer.id === activeLayer);
    }
    if (!showAll) {
      result = result.filter((tech) => values.includes(tech.id));
    }

    return result;
  }, [technologies, activeLayer, showAll, values]);
  return (
    <div>
      {/* <h5 className="badge text-gray" data-badge={values.length}>
        Selected Tech
      </h5> */}

      {/* <Row justifyContent="space-between" alignItems="center" margin="20px 0 10px 0"> */}
      <label className="form-switch c-hand no-select">
        <div className="switch-text">{showAll ? "Showing All" : "Just Selected "}</div>
        <input type="checkbox" checked={!showAll} onClick={() => setShowAll((prev) => !prev)} />
        <i className="form-icon"></i>
      </label>
      <FilterButtons
        onChange={(val: number) => setActiveLayer(val)}
        value={activeLayer}
        options={layers}
      />
      {/* </Row> */}

      {!itemsToShow.length && <p className="mt-2 pt-2 text-gray">Nothing to see here...</p>}
      {!!itemsToShow.length && (
        <>
          {categories.map((category) => {
            let categoryTech = itemsToShow.filter((tech) => tech.category.id === category.id);
            if (!categoryTech.length) return null;
            return (
              <div style={{ padding: "20px 0" }}>
                <h3 className="h5 mt-2">{category.title}</h3>
                <table className="mt-2 table table-hover" key={activeLayer}>
                  <tbody style={{ border: "1px solid #dadee4" }}>
                    {categoryTech.map((tech) => (
                      <tr
                        key={tech.id}
                        className={"c-hand " + (values.includes(tech.id) ? "bg-secondary" : "")}
                        onClick={(e) => toggleSelect(tech.id)}
                      >
                        <td className="hide-mobile" width="110px">
                          <img
                            src={tech.logo}
                            style={{ width: "150px" }}
                            className="img-fit-cover"
                          />
                        </td>
                        <td>
                          <div>
                            <div className="text-bold">{tech.title}</div>
                            <div className="text-gray">{tech.tagline}</div>
                            <div>
                              <div className="label label-rounded label-secondary mb-1 mr-1">
                                {tech?.layer?.title}
                              </div>
                              <div className="label label-rounded label-secondary">
                                {tech?.category?.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-primary">
                          <div style={{ paddingRight: "8px" }}>
                            <i
                              className={
                                "icon icon-check " + (!values.includes(tech.id) ? "invisible" : "")
                              }
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
          <div className="mt-2 text-gray">
            Not seeing what you need? <Link to="/tech/new">Create New Tech</Link>
          </div>
        </>
      )}
    </div>
  );
}

interface Props {
  values: number[];
  onChange: (techIds: number[]) => void;
  technologies: Tech[];
  layers: Layer[];
  categories: Category[];
}
