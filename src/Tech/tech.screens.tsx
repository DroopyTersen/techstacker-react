import React from "react";
import { useNavigate } from "react-router-dom";
import TechForm from "./components/TechForm";

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
