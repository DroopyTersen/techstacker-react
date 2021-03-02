import { GraphQL } from "@components/GraphQL";
import { Row } from "@components/layout";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForceLogin } from "../auth/auth.screens";
import { STACK_SELECT_FRAGMENT } from "../Stacks/stacks.gql";

import TechDetails from "./components/TechDetails";
import TechForm from "./components/TechForm";

import { TECH_SELECT_FRAGMENT } from "./tech.gql";

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

const QUERY_TECH_DETAILS = `query TechDetails($id:Int!) {
  technology(id:$id) {
    ${TECH_SELECT_FRAGMENT}
    description
  }
  stacks(where: {technologies: {tech_id: {_eq: $id }}}) {
    ${STACK_SELECT_FRAGMENT}
  }
}`;

export const TechDetailsScreen = () => {
  let { techId } = useParams();
  return (
    <GraphQL query={QUERY_TECH_DETAILS} variables={{ id: parseInt(techId) }}>
      {({ data }) => <TechDetails tech={data?.technology} stacks={data?.stacks || []} />}
    </GraphQL>
  );
};

export const QUERY_TECH_FOR_FORM = `query TechForm($id:Int!) {
  technology(id:$id) {
    ${TECH_SELECT_FRAGMENT}
    description
  }
  layers(order_by: {position: asc}) {
    title
    id
  }
  categories(order_by: {position: asc}) {
    title
    id
  }
}`;

export const TechFormScreen = ({ title }) => {
  useForceLogin();
  let navigate = useNavigate();
  let { techId = "-1" } = useParams();
  return (
    <>
      <h1>{title}</h1>
      <GraphQL query={QUERY_TECH_FOR_FORM} variables={{ id: parseInt(techId) }}>
        {({ data }) => (
          <TechForm
            {...data}
            initial={data?.technology || {}}
            onCancel={() => history.back()}
            onSuccess={(result) => navigate("/tech/" + result.id)}
          />
        )}
      </GraphQL>
    </>
  );
};
