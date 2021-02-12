import { useDebouncedValue } from "@hooks/useDebounce";
import React, { useMemo, useState } from "react";
import AutoSuggest from "react-autosuggest";
import useGraphQL from "../common/gql";
import { QUERY_SEARCH_TECH } from "../Tech/tech.gql";
import "./Autocomplete.css";

export function TechAutocomplete({ onChange }) {
  let [inputValue, setInputValue] = useState("");
  let debouncedValue = useDebouncedValue(inputValue, 200);
  let memoizedVars = useMemo(() => {
    return {
      search: `%${debouncedValue || Date.now()}%`,
    };
  }, [debouncedValue]);
  let [{ data }, { isLoading }] = useGraphQL(QUERY_SEARCH_TECH, memoizedVars);
  let suggestions = isLoading || !inputValue ? [] : data?.technologies || [];

  return (
    <AutoSuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => setInputValue(value)}
      onSuggestionsClearRequested={() => setInputValue("")}
      getSuggestionValue={(tech) => tech.id}
      renderSuggestion={(tech) => <div>{tech.title}</div>}
      inputProps={{
        className: "form-input",
        value: inputValue,
        onChange: (e, { newValue }) => {
          if (typeof newValue === "number") {
            onChange(newValue);
          }
        },
      }}
    />
  );
}
