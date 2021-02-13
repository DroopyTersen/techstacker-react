import FilterButtons from "@components/FilterButtons";
import { Row } from "@components/layout";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Layer, useLayers } from "../../App/AppDataProvider";
import useGraphQL from "../../common/gql";
import { Tech } from "../../Tech/tech.data";
import { QUERY_AVAILABLE_TECH } from "../stacks.gql";

export default function TechSelector({ values, onChange, technologies, layers }: Props) {
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
          <table className="mt-2 table table-hover" key={activeLayer}>
            <tbody style={{ border: "1px solid #dadee4" }}>
              {itemsToShow.map((tech) => (
                <tr
                  key={tech.id}
                  className={"c-hand " + (values.includes(tech.id) ? "bg-secondary" : "")}
                  onClick={(e) => toggleSelect(tech.id)}
                >
                  <td className="hide-mobile" width="110px">
                    <img src={tech.logo} style={{ width: "100px" }} className="img-fit-cover" />
                  </td>
                  <td>
                    <Row>
                      <div>
                        <div className="text-bold">{tech.title}</div>
                        <div className="text-gray">{tech.tagline}</div>
                      </div>
                      <div
                        style={
                          {
                            // flexDirection: "column",
                            // display: "flex",
                            // alignItems: "flex-end",
                          }
                        }
                      >
                        <div className="label label-rounded label-secondary mb-1 mr-1">
                          {tech?.layer?.title}
                        </div>
                        <div className="label label-rounded label-secondary">
                          {tech?.category?.title}
                        </div>
                      </div>
                    </Row>
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
}
