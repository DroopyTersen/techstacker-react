import React from "react";

import QueryLink from "@components/QueryLink";
import { processTags } from "@components/tags";

export default function TechTags({ tags, ...rest }) {
  let tagsArray = tags;
  if (typeof tags === "string") {
    tagsArray = processTags(tags);
  }
  return (
    <div className="tags" {...rest}>
      {(tagsArray || []).map((tag) => (
        <QueryLink
          path="/tech"
          param="tag"
          value={tag}
          key={tag}
          className="mr-1 mt-1 label label-secondary tag"
        >
          #{tag}
        </QueryLink>
      ))}
    </div>
  );
}
