import { Input, TextArea } from "@components/forms";
import Tabs from "@components/Tabs";
import { useSaveForm } from "@hooks/useForm";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
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
  let form = useSaveForm({ onSave: saveStack, onSuccess, initial });
  let values = form.watch();
  console.log("🚀 | values", values);

  let [activeTab, setActiveTab] = useState("info");

  return (
    <form onSubmit={form.onSubmit}>
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
        <div className="column col-6 col-md-12">
          <input type="hidden" name="id" ref={form.register}></input>
          <Input
            label="Title"
            hint="What kind of app was it?"
            name="title"
            ref={form.register({ required: true })}
          />
          <Tabs
            onChange={setActiveTab}
            value={activeTab}
            options={[
              { title: "Info", id: "info" },
              { title: "Tech", id: "select" },
            ]}
          />
          <div className={activeTab !== "info" ? "hidden" : ""}>
            <TextArea
              name="tagline"
              label="Tagline"
              rows={2}
              hint="Describe the stack in less than one sentance."
              ref={form.register}
            />

            <TextArea
              name="image"
              label="Image"
              rows={2}
              hint="A url to an image."
              ref={form.register}
            />
            <TextArea
              name="description"
              hint="Describe the tech stack. You can use Markdown."
              label="Description"
              className="markdown"
              ref={form.register}
              rows={20}
            />
            <div className="form-actions mt-2">
              <button className="btn btn-link mr-2" type="button" onClick={() => onCancel()}>
                CANCEL
              </button>
              <button className="btn btn-primary">SAVE</button>
            </div>
          </div>
          <div className={activeTab !== "select" ? "hidden" : ""}>
            <Controller
              name="techIds"
              control={form.control}
              defaultValue={initial.techIds}
              render={(props) => (
                <TechSelector
                  values={props.value}
                  onChange={props.onChange}
                  technologies={technologies}
                  layers={layers}
                  categories={categories}
                />
              )}
            />
          </div>
        </div>
        {/* <div className="column col-1 hide-mobile" data-content=""></div> */}
        <div className="column col-6 col-md-12 hide-mobile">
          <StackPreview stack={values} technologies={technologies} />
        </div>
      </div>
    </form>
  );
}

function StackPreview({ stack, technologies }: { stack: StackFormValues; technologies: Tech[] }) {
  return (
    <>
      {/* <div className="label">Preview</div> */}
      {stack?.image && (
        <img
          src={stack.image}
          className="img-responsive img-fit-cover"
          style={{ width: "100%", aspectRatio: "16/9" }}
        ></img>
      )}
      <h1 style={{ marginTop: "30px" }}>{stack?.title}</h1>
      <h5 className="text-gray">{stack.tagline}</h5>

      <div>
        <ReactMarkdown source={stack?.description} />
      </div>

      <StackTech
        stack={{
          ...stack,
          technologies: (stack.techIds || [])
            .map((tech_id) => ({
              tech_id,
              stack_id: stack.id,
              technology: technologies.find((t) => t.id === tech_id),
            }))
            .filter((t) => t.technology),
        }}
      />
    </>
  );
}
