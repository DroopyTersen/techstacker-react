import { Row } from "@components/layout";
import React, { useEffect, useMemo, useState } from "react";
import { Layer, useLayers } from "../../App/AppDataProvider";
import useGraphQL from "../../common/gql";
import { Tech } from "../../Tech/tech.data";
import { QUERY_AVAILABLE_TECH } from "../stacks.gql";

export default function TechSelector({ values, onChange, technologies, layers }: Props) {
  let [activeLayer, setActiveLayer] = useState(() => (layers.length ? layers[0].id : 0));
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

    return result;
  }, [technologies, activeLayer]);
  return (
    <div>
      <h3>Select Tech</h3>
      <ul className="tab tab-block" style={{ marginBottom: "20px" }}>
        {layers.map((layer) => (
          <li onClick={() => setActiveLayer(layer.id)} className={"tab-item"}>
            <a href="#" className={" " + (activeLayer === layer.id ? "active" : "")}>
              {layer.title}
            </a>
          </li>
        ))}
      </ul>

      <table className="table" key={activeLayer}>
        {/* <thead>
          <th>Title</th>
          <th>Layer</th>
          <th>Category</th>
          <th>Logo</th>
        </thead> */}
        <tbody>
          {itemsToShow.map((tech) => (
            <tr
              key={tech.id}
              className={values.includes(tech.id) ? "active" : ""}
              onClick={(e) => toggleSelect(tech.id)}
            >
              <td width="110px">
                <img src={tech.logo} style={{ width: "100px" }} className="img-fit-cover" />
              </td>
              <td>
                <Row justifyContent="space-between">
                  <div style={{ flex: "0 1 400px" }}>
                    <div className="text-bold">{tech.title}</div>
                    <div className="text-gray">{tech.tagline}</div>
                  </div>
                  <div
                    style={{
                      //   flex: "1 1 100px",
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <div className="label label-rounded label-secondary mb-1">
                      {tech?.layer?.title}
                    </div>
                    <div className="label label-rounded label-secondary">
                      {tech?.category?.title}
                    </div>
                  </div>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface Props {
  values: number[];
  onChange: (techIds: number[]) => void;
  technologies: Tech[];
  layers: Layer[];
}
