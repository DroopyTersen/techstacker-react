import { GraphQL } from "@components/GraphQL";
import { Row } from "@components/layout";
import { useQueryParam, useQueryParams } from "@hooks/useQueryParams";

import React, { useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppData } from "../App/AppDataProvider";

import TechDetails from "./components/TechDetails";
import TechForm from "./components/TechForm";
import TechGrid from "./components/TechGrid";
import { getTechVariables } from "./tech.data";
import { QUERY_RECENT_TECH, QUERY_TECH_BY_ID } from "./tech.gql";

export const NewTechScreen = () => {
  let navigate = useNavigate();
  let queryParams = useQueryParams();
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

export const TechScreen = ({ title = "Web Tech", children }) => {
  return (
    <div className="screen tech-screen">
      <Row alignItems="flex-start" justifyContent="space-between" gap="0">
        <h1>{title}</h1>
        <Link to="/tech/new" className="btn btn-primary mb-2">
          NEW TECH
          <i className="icon icon-plus ml-2"></i>
        </Link>
      </Row>
      {children}
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
  let layers = useAppData();
  return (
    <>
      <h1>Edit Tech</h1>
      <GraphQL query={QUERY_TECH_BY_ID} variables={{ id: parseInt(techId) }}>
        {({ data }) =>
          !layers ? null : (
            <TechForm
              initial={data?.technology}
              onCancel={() => history.back()}
              onSuccess={(result) => navigate("/tech/" + result.id)}
            />
          )
        }
      </GraphQL>
    </>
  );
};
