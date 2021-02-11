import { ErrorCard } from "@components/errors";
import { GraphQL } from "@components/GraphQL";

import React, { ReactNode, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TechDetails from "./components/TechDetails";
import TechForm from "./components/TechForm";
import TechGrid from "./components/TechGrid";
import { QUERY_TECH, QUERY_TECH_BY_ID } from "./tech.gql";

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
  return (
    <div className="screen all-tech">
      <h1>All Tech</h1>
      <GraphQL query={QUERY_TECH} cacheKey="cached-tech">
        {({ data }) => <TechGrid technologies={data?.technologies} />}
      </GraphQL>
    </div>
  );
};

export const TechDetailsScreen = () => {
  let { techId } = useParams();
  return (
    <GraphQL query={QUERY_TECH_BY_ID} variables={{ id: parseInt(techId) }}>
      {({ data }) => <TechDetails tech={data?.technology} />}
    </GraphQL>
  );
};
