import useAsyncData from "@hooks/useAsyncData";
import { useDebouncedEffect, useDebouncedValue } from "@hooks/useDebounce";
import useDebouncedInputValue from "@hooks/useDebouncedInputValue";
import React, { useEffect, useMemo, useState } from "react";
import AutoSuggest from "react-autosuggest";
import { searchTech, Tech } from "../Tech/tech.data";
import "./Autocomplete.css";

export function SearchAutocomplete({ onChange }) {
  let [search, setSearch] = useState("");
  let { data: technologies } = useAsyncData<Tech[]>(searchTech, [search], []);

  return (
    <Autocomplete
      suggestions={technologies.map((t) => ({ text: t.title, ...t }))}
      onChange={setSearch}
      onSelect={(item) => onChange(item.id)}
      value={search}
    />
  );
}

export function Autocomplete(props: AutocompleteProps) {
  let [value, setValue] = useDebouncedInputValue(props.value, props.onChange);
  let [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>(props.suggestions || []);

  useEffect(() => {
    setSuggestions(props.suggestions);
  }, [props.suggestions]);

  return (
    <AutoSuggest
      highlightFirstSuggestion={true}
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => {
        // Clear it when you type?
        setValue(value);
        setSuggestions([]);
      }}
      onSuggestionsClearRequested={() => {
        setValue("");
        setSuggestions([]);
      }}
      getSuggestionValue={(suggestion: AutocompleteSuggestion) => suggestion.text}
      renderSuggestion={(suggestion: AutocompleteSuggestion) => <div>{suggestion.text}</div>}
      inputProps={{
        className: "form-input",
        value: value,
        onChange: (e, { newValue }) => {
          setValue(e.currentTarget.value);
        },
      }}
      onSuggestionSelected={(e, { suggestion }) => {
        console.log("🚀 | Autocomplete | onSELECTED", suggestion);

        props.onSelect(suggestion);
      }}
    />
  );
}

export type AutocompleteSuggestion = {
  text: string;
  [key: string]: any;
};

export interface AutocompleteProps {
  onChange: (value: string) => void;
  onSelect: (suggestion: AutocompleteSuggestion) => void;
  value: string;
  suggestions: AutocompleteSuggestion[];
}
