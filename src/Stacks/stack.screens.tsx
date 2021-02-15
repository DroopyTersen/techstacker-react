import { GraphQL } from "@components/GraphQL";
import { MotionGrid } from "@components/Grid";
import { Row } from "@components/layout";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StackCard from "./components/StackCard";
import StackDetails from "./components/StackDetails";
import StackForm from "./components/StackForm";
import StackGrid from "./components/StackGrid";
import { QUERY_RECENT_STACKS, QUERY_STACK_BY_ID, QUERY_STACK_FOR_EDIT } from "./stacks.gql";

export const NewStackScreen = () => {
  let navigate = useNavigate();
  // let queryParams = new URLSearchParams(useLocation().search);
  // let initial = {
  //   category_id: queryParams.get("categoryId"),
  //   layer_id: queryParams.get("layerId"),
  // };

  return (
    <div className="screen new-stack">
      <h1>New Stack</h1>
      <StackForm
        onCancel={() => history.back()}
        onSuccess={(result) => navigate("/stacks/" + result.id)}
      />
    </div>
  );
};

export const StacksScreen = ({ limit = 100 }) => {
  return (
    <div>
      <Row alignItems="flex-start" justifyContent="space-between" gap="0">
        <h1>Recent Stacks</h1>
        <Link to="/stacks/new" className="btn btn-primary mb-2">
          NEW STACK
          <i className="icon icon-plus ml-2"></i>
        </Link>
      </Row>
      <GraphQL query={QUERY_RECENT_STACKS} variables={{ limit }} cacheKey="cached-stacks">
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

export const EditStackScreen = () => {
  let navigate = useNavigate();
  let { stackId } = useParams();
  return (
    <>
      <h1>Edit Tech</h1>
      <GraphQL query={QUERY_STACK_FOR_EDIT} variables={{ id: parseInt(stackId) }}>
        {({ data }) => (
          <StackForm
            initial={{
              ...data?.stack,
              techIds: (data?.stack?.technologies || []).map((t) => t.tech_id),
            }}
            onCancel={() => history.back()}
            onSuccess={(result) => navigate("/stacks/" + result.id)}
          />
        )}
      </GraphQL>
    </>
  );
};
