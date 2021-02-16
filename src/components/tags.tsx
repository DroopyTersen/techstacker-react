import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { TextArea } from "./forms";

export const processTags = (tagsStr): string[] => {
  return Array.from(
    new Set(
      tagsStr
        .replace(/, /g, ",")
        .replace(/ /g, ",")
        .split(",")
        .map((tag) => slugify(tag.trim().toLowerCase()))
        .filter(Boolean)
    )
  );
};

export interface TagsInputProps {
  onChange?: (tags: string[]) => void;
  defaultValue: string[];
  [key: string]: any;
}
export function TagsInput({ onChange, defaultValue = [], ...rest }: TagsInputProps) {
  let [value, setValue] = useState((defaultValue || []).join(", "));

  useEffect(() => {
    if (onChange) {
      let tags = processTags(value);
      onChange(tags);
    }
  }, [value]);

  return (
    <>
      <TextArea
        id="tags"
        label="Tags"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        rows={2}
        {...rest}
        hint={value ? "" : "A comma separated list."}
      />
      <TagsDisplay tags={processTags(value)} style={{ margin: ".5rem 0 .8rem 0" }} />
    </>
  );
}

interface TagsDisplayProps {
  tags: string[];
  getLinkPath?: (tag: string) => string;
  [key: string]: any;
}
export function TagsDisplay({ tags, getLinkPath, ...rest }: TagsDisplayProps) {
  let tagsArray = tags;
  if (typeof tags === "string") {
    tagsArray = processTags(tags);
  }
  let Element = getLinkPath ? Link : "span";
  return (
    <div className="tags" {...rest}>
      {(tagsArray || []).map((tag) => (
        <Element
          to={getLinkPath ? getLinkPath(tag) : ""}
          key={tag}
          className="mr-1 mt-1 label label-secondary tag"
        >
          #{tag}
        </Element>
      ))}
    </div>
  );
}

export interface Tag {
  name: string;
  id: number;
}
