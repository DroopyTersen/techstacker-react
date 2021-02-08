import { MotionGrid } from "@components/Grid";
import usePersistedState from "@hooks/usePersistedState";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGraphQL from "../common/gql";
import TechCard from "./components/TechCard";
import TechForm from "./components/TechForm";
import { Tech } from "./tech.data";
import { QUERY_TECH } from "./tech.gql";

export const NewTechScreen = () => {
  let navigate = useNavigate();
  return (
    <div className="screen new-tech">
      <h1>New Tech</h1>
      <TechForm
        onCancel={() => history.back()}
        onSuccess={(result) => navigate("/tech/" + result.id)}
      />
    </div>
  );
};

export const TechScreen = () => {
  let [{ data }] = useGraphQL(QUERY_TECH);
  let [technologies, setTechnologies] = usePersistedState<Tech[]>("cached-tech", []);
  console.log("🚀 | TechScreen | technologies", technologies);

  useEffect(() => {
    if (data?.technologies) {
      setTechnologies(data.technologies);
    }
  }, [data?.technologies]);

  return (
    <div className="screen all-tech">
      <h1>All Tech</h1>
      <MotionGrid width="350px" gap="20px">
        {technologies.map((tech) => (
          <MotionGrid.Item key={tech.id}>
            <TechCard tech={tech} imageSize="200px" />
          </MotionGrid.Item>
        ))}
      </MotionGrid>
    </div>
  );
};
