import { useQueryParams } from "@hooks/useQueryParams";
import React from "react";
import { Link } from "react-router-dom";

function QueryLink({ path, param, value, children, ...rest }) {
  let queryParams = useQueryParams();
  if (!value && param) {
    queryParams.delete(param);
  } else if (param && value) {
    queryParams.set(param, value + "");
  }
  let url = path + "?" + queryParams.toString();
  return (
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
}

export default React.memo(QueryLink);
