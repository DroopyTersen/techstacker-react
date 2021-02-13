import { Row } from "@components/layout";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import StackForm from "./components/StackForm";

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
