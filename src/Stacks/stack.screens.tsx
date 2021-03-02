import { GraphQL } from "@components/GraphQL";
import { Row } from "@components/layout";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForceLogin } from "../auth/auth.screens";
import { STACK_CARD_SELECT_FRAGMENT } from "./components/StackCard";
import StackDetails from "./components/StackDetails";
import StackForm from "./components/StackForm";
import StackGrid from "./components/StackGrid";
import { QUERY_STACK_BY_ID } from "./stacks.gql";

const QUERY_STACKS = `
query GetRecentStacks{
    stacks(order_by: {created_at: desc}, limit: 100) {
        ${STACK_CARD_SELECT_FRAGMENT}
    }
}
`;

export const StacksScreen = () => {
  return (
    <div>
      <Row alignItems="flex-start" justifyContent="space-between" gap="0">
        <h1>Stacks</h1>
        <Link to="/stacks/new" className="btn btn-primary mb-2">
          NEW STACK
          <i className="icon icon-plus ml-2"></i>
        </Link>
      </Row>
      <GraphQL query={QUERY_STACKS}>
        {({ data }) => <StackGrid width="350px" stacks={data?.stacks} />}
      </GraphQL>
    </div>
  );
};

export const StackDetailsScreen = () => {
  let { stackId } = useParams();
  return (
    <GraphQL query={QUERY_STACK_BY_ID} variables={{ id: parseInt(stackId) }}>
      {({ data }) => <StackDetails stack={data?.stack} />}
    </GraphQL>
  );
};

export const StackFormScreen = ({ title }) => {
  useForceLogin();
  let navigate = useNavigate();
  let { stackId = "-1" } = useParams();
  return (
    <>
      <h1>{title}</h1>
      <GraphQL query={QUERY_FOR_STACK_FORM} variables={{ id: parseInt(stackId) }}>
        {({ data }) => (
          <StackForm
            initial={{
              ...data?.stack,
              techIds: (data?.stack?.technologies || []).map((t) => t.tech_id),
            }}
            {...data}
            onCancel={() => history.back()}
            onSuccess={(result) => navigate("/stacks/" + result.id)}
          />
        )}
      </GraphQL>
    </>
  );
};

const QUERY_FOR_STACK_FORM = `
query StackForm($id: Int!) {
  stack(id: $id) {
    id
    image
    tagline
    title
    description
    technologies {
      tech_id
    }
  }
  layers(order_by: {position: asc}) {
    title
    id
  }
  categories(order_by: {position: asc}) {
    title
    id
  }
  technologies(order_by: {layer: {position: asc}, category: {position: asc}, title: asc}) {
    id
    title
    logo
    tagline
    category {
      id
      title
      position
    }
    layer {
      id
      title
      position
    }
  }
}

`;
