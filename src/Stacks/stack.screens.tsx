import { GraphQL } from "@components/GraphQL";
import { Row } from "@components/layout";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StackForm from "./components/StackForm";
import { QUERY_STACK_FOR_EDIT } from "./stacks.gql";

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

export const StacksScreen = () => {
  return (
    <div>
      <Row alignItems="flex-start" justifyContent="space-between">
        <h1>Recent Stacks</h1>
        <Link to="/stacks/new" className="btn btn-primary">
          NEW STACK
          <i className="icon icon-plus ml-2"></i>
        </Link>
      </Row>
    </div>
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
