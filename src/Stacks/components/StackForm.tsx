import { Input, TextArea } from "@components/forms";
import { TwoColumn, TwoColumnEven } from "@components/layout";
import Tabs from "@components/Tabs";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAppData } from "../../App/AppDataProvider";
import useGraphQL from "../../common/gql";
import TechGrid from "../../Tech/components/TechGrid";
import { Tech } from "../../Tech/tech.data";
import { QUERY_AVAILABLE_TECH } from "../stacks.gql";
import TechSelector from "./TechSelector";

export default function StackForm({ onCancel, onSuccess }) {
  let [techIds, setTechIds] = useState([]);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [activeTab, setActiveTab] = useState("tech");

  let { layers = [], categories = [] } = useAppData();
  let [{ data }] = useGraphQL(QUERY_AVAILABLE_TECH);
  let technologies: Tech[] = data?.technologies || [];
  return (
    <form>
      <div
        className="form-actions mb-2 p-absolute hide-mobile"
        style={{ top: "-40px", right: "0" }}
      >
        <button className="btn btn-link mr-2" type="button" onClick={() => onCancel()}>
          CANCEL
        </button>
        <button className="btn btn-primary">SAVE</button>
      </div>
      <div className="columns">
        <div className="column col-md-12">
          <Input
            label="Title"
            hint="What kind of app was it?"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <Tabs
            options={[
              { id: "description", title: "Description" },
              { id: "tech", title: "Tech" },
            ]}
            onChange={setActiveTab}
            value={activeTab}
            style={{ marginBottom: "30px" }}
          />

          {activeTab === "description" && (
            <TextArea
              id="description"
              hint="Describe the tech stack. You can use Markdown."
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              rows={12}
            />
          )}
          {activeTab === "tech" && !!technologies.length && !!layers.length && (
            <TechSelector
              values={techIds}
              onChange={setTechIds}
              technologies={technologies}
              layers={layers}
            />
          )}
          <div
            className="form-actions mt-2"
            // style={{ top: "-40px", right: "0" }}
          >
            <button className="btn btn-link mr-2" type="button" onClick={() => onCancel()}>
              CANCEL
            </button>
            <button className="btn btn-primary">SAVE</button>
          </div>
        </div>
        <div className="divider-vert hide-mobile" data-content=""></div>
        <div className="column hide-mobile">
          <div className="label">Preview</div>
          <h2>{title}</h2>
          <div>
            <ReactMarkdown source={description} />
          </div>

          {layers.map((layer) => {
            let layerTech = categories.reduce((layerTech, category) => {
              return [
                ...layerTech,
                ...technologies.filter(
                  (tech) =>
                    tech?.category?.id === category?.id &&
                    tech?.layer?.id === layer?.id &&
                    techIds.includes(tech.id)
                ),
              ];
            }, []);
            if (!layerTech || !layerTech.length) {
              return null;
            }
            return (
              <>
                <h3 className="h5">{layer.title}</h3>
                <div className="mb-2">
                  <TechGrid width="200px" imageSize="120px" gap="5px" technologies={layerTech} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </form>
  );
}
