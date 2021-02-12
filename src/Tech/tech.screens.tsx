import { GraphQL } from "@components/GraphQL";
import { Row } from "@components/layout";

import React, { ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import TechDetails from "./components/TechDetails";
import TechForm from "./components/TechForm";
import TechGrid from "./components/TechGrid";
import { QUERY_RECENT_TECH, QUERY_TECH_BY_ID } from "./tech.gql";

export const NewTechScreen = () => {
  let navigate = useNavigate();
  let queryParams = new URLSearchParams(useLocation().search);
  let initial = {
    category_id: queryParams.get("categoryId"),
    layer_id: queryParams.get("layerId"),
  };

  return (
    <div className="screen new-tech">
      <h1>New Tech</h1>
      <TechForm
        initial={initial}
        onCancel={() => history.back()}
        onSuccess={(result) => navigate("/tech/" + result.id)}
      />
    </div>
  );
};

export const TechScreen = () => {
  return (
    <div className="screen all-tech">
      <Row alignItems="flex-start" justifyContent="space-between">
        <h1>Recent Tech</h1>
        <Link to="/tech/new" className="btn btn-primary">
          NEW TECH
          <i className="icon icon-plus ml-2"></i>
        </Link>
      </Row>
      <GraphQL query={QUERY_RECENT_TECH} cacheKey="cached-tech">
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

export const EditTechScreen = () => {
  let navigate = useNavigate();
  let { techId } = useParams();
  return (
    <>
      <h1>Edit Tech</h1>
      <GraphQL query={QUERY_TECH_BY_ID} variables={{ id: parseInt(techId) }}>
        {({ data }) => (
          <TechForm
            initial={data?.technology}
            onCancel={() => history.back()}
            onSuccess={(result) => navigate("/tech/" + result.id)}
          />
        )}
      </GraphQL>
    </>
  );
};
