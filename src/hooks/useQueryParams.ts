import { useLocation } from "react-router-dom";

export function useQueryParams(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

export function useQueryParam(key, fallback = "") {
  let params = new URLSearchParams(useLocation().search);
  return params.get(key) || fallback;
}
