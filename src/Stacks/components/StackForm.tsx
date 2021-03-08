import { Input, TextArea } from "@components/forms";
import Tabs from "@components/Tabs";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Category, Layer } from "../../App/AppDataProvider";
import { Tech } from "../../Tech/tech.data";
import { saveStack, StackFormValues } from "../stack.data";
import StackTech from "./StackTech";
import TechSelector from "./TechSelector";

interface Props {
  onSuccess: (stack: StackFormValues) => void;
  onCancel: () => void;
  initial?: StackFormValues;
  technologies: Tech[];
  layers: Layer[];
  categories: Category[];
}

export default function StackForm({
  onCancel,
  onSuccess,
  initial = {},
  layers = [],
  categories = [],
  technologies = [],
}: Props) {
  let [techIds, setTechIds] = useState(initial.techIds || []);
  let [title, setTitle] = useState(initial.title || "");
  let [tagline, setTagline] = useState(initial.tagline || "");
  let [description, setDescription] = useState(initial.description || "");
  let [image, setImage] = useState(initial.image || "");

  let [activeTab, setActiveTab] = useState("select");

  let onSubmit = async (e) => {
    e.preventDefault();
    let formValues: StackFormValues = {
      id: initial.id || undefined,
      title,
      tagline,
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
            name="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            required
          />
          <TextArea
            name="tagline"
            label="Tagline"
            rows={2}
            hint="Describe the stack in less than one sentance."
            value={tagline}
            onChange={(e) => setTagline(e.currentTarget.value)}
          />

          <TextArea
            name="image"
            label="Image"
            rows={2}
            hint="A url to an image."
            value={image}
            onChange={(e) => setImage(e.currentTarget.value)}
          />
          <TextArea
            name="description"
            hint="Describe the tech stack. You can use Markdown."
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            rows={7}
          />
          <div className="form-actions mt-2">
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
              {image && (
                <img
                  src={image}
                  className="img-responsive img-fit-cover"
                  style={{ height: "min(55vh, 50vw)", width: "100%" }}
                ></img>
              )}
              <h1 style={{ marginTop: "30px" }}>{title}</h1>
              <div>
                <ReactMarkdown source={description} />
              </div>

              <StackTech
                stack={{
                  title,
                  description,
                  techIds,
                  technologies: techIds
                    .map((tech_id) => ({
                      tech_id,
                      stack_id: initial.id,
                      technology: technologies.find((t) => t.id === tech_id),
                    }))
                    .filter((t) => t.technology),
                }}
              />
            </>
          )}
        </div>
      </div>
    </form>
  );
}
