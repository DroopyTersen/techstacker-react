import { Input, TextArea } from "@components/forms";
import { TwoColumn, TwoColumnEven } from "@components/layout";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAppData } from "../../App/AppDataProvider";
import useGraphQL from "../../common/gql";
import { Tech } from "../../Tech/tech.data";
import { QUERY_AVAILABLE_TECH } from "../stacks.gql";
import TechSelector from "./TechSelector";

export default function StackForm() {
  let [techIds, setTechIds] = useState([]);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let { layers = [], categories = [] } = useAppData();
  let [{ data }] = useGraphQL(QUERY_AVAILABLE_TECH);
  let technologies: Tech[] = data?.technologies || [];
  return (
    <form>
      <TwoColumn>
        <div>
          <Input
            label="Title"
            hint="What kind of app was it?"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <TextArea
            id="description"
            hint="Describe the tech stack"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          {technologies.length && layers.length && (
            <TechSelector
              values={techIds}
              onChange={setTechIds}
              technologies={technologies}
              layers={layers}
            />
          )}
        </div>
        <div>
          <h2>{title}</h2>
          <div>
            <ReactMarkdown source={description} />
          </div>

          {layers.map((layer) => (
            <>
              <h4>{layer.title}</h4>
              <ul>
                {categories.map((category) =>
                  technologies
                    .filter(
                      (tech) =>
                        tech?.category?.id === category?.id &&
                        tech?.layer?.id === layer?.id &&
                        techIds.includes(tech.id)
                    )
                    .map((tech) => <li>{tech.title}</li>)
                )}
              </ul>
            </>
          ))}
        </div>
      </TwoColumn>
    </form>
  );
}
