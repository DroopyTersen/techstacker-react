import { Input, TextArea } from "@components/forms";
import { TwoColumn, TwoColumnEven } from "@components/layout";
import Tabs from "@components/Tabs";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAppData } from "../../App/AppDataProvider";
import useGraphQL from "../../common/gql";
import TechGrid from "../../Tech/components/TechGrid";
import { Tech } from "../../Tech/tech.data";
import { saveStack, StackFormValues } from "../stack.data";
import { QUERY_AVAILABLE_TECH } from "../stacks.gql";
import TechSelector from "./TechSelector";

interface Props {
  onSuccess: (stack: StackFormValues) => void;
  onCancel: () => void;
  initial?: StackFormValues;
}
export default function StackForm({ onCancel, onSuccess, initial = {} }: Props) {
  let [techIds, setTechIds] = useState(initial.techIds || []);
  let [title, setTitle] = useState(initial.title || "");
  let [description, setDescription] = useState(initial.description || "");
  let [image, setImage] = useState(initial.image || "");
  let [activeTab, setActiveTab] = useState("select");

  let { layers = [], categories = [] } = useAppData();
  let [{ data }] = useGraphQL(QUERY_AVAILABLE_TECH);
  let technologies: Tech[] = data?.technologies || [];
  let onSubmit = async (e) => {
    e.preventDefault();
    let formValues: StackFormValues = {
      id: initial.id || undefined,
      title,
      description,
      image,
      techIds,
    };
    try {
      let stack = await saveStack(formValues);
      if (stack) {
        onSuccess(stack);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={onSubmit}>
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
        <div className="column col-4 col-md-12">
          <Input
            label="Title"
            hint="What kind of app was it?"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            required
          />

          <TextArea
            id="image"
            label="Image"
            rows={2}
            hint="A url to an image."
            value={image}
            onChange={(e) => setImage(e.currentTarget.value)}
          />
          <TextArea
            id="description"
            hint="Describe the tech stack. You can use Markdown."
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            rows={7}
          />
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
        <div className="column">
          <Tabs
            onChange={setActiveTab}
            value={activeTab}
            options={[
              { title: "Select Tech", id: "select" },
              { title: "Preview", id: "preview" },
            ]}
          />
          {activeTab === "select" && (
            <TechSelector
              values={techIds}
              onChange={setTechIds}
              technologies={technologies}
              layers={layers}
              categories={categories}
            />
          )}
          {activeTab === "preview" && (
            <>
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
                  <div style={{ padding: "20px 0" }}>
                    <h3 className="h5">{layer.title}</h3>
                    <div className="mb-2">
                      <TechGrid
                        width="200px"
                        imageSize="120px"
                        gap="5px"
                        technologies={layerTech}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </form>
  );
}
