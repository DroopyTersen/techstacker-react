import React from "react";
import StackForm from "./components/StackForm";

export const NewStackScreen = () => {
  // let queryParams = new URLSearchParams(useLocation().search);
  // let initial = {
  //   category_id: queryParams.get("categoryId"),
  //   layer_id: queryParams.get("layerId"),
  // };

  return (
    <div className="screen new-stack">
      <h1>New Stack</h1>
      <StackForm
      // onCancel={() => history.back()}
      // onSuccess={(result) => navigate("/tech/" + result.id)}
      />
    </div>
  );
};
