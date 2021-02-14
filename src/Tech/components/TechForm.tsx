import { Input, TextArea, Select } from "@components/forms";
import useForm from "@hooks/useForm";
import useLinkPreview from "@hooks/useLinkPreview";
import React, { useEffect, useState } from "react";
import { useAppData } from "../../App/AppDataProvider";
import { saveTech, Tech } from "../tech.data";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import TechCard from "./TechCard";
import { TwoColumn } from "@components/layout";

export interface TechFormProps {
  initial?: Tech;
  onSuccess: (tech: Tech) => void;
  onCancel: () => void;
}
const defaultValues: Tech = {
  title: "New Tech",
  logo:
    "https://images.unsplash.com/photo-1575470522418-b88b692b8084?&auto=format&fit=crop&w=1366&q=80",
};
export default function TechForm({ onSuccess, onCancel, initial = {} }) {
  let { layers = [], categories = [] } = useAppData();
  let { formProps, error, isSaving, getValue, updateValue, syncValues, formValues } = useForm({
    onSuccess,
    onSave: saveTech,
    initial,
  });
  console.log("🚀 | TechForm", formValues, initial);
  let [link, setLink] = React.useState("");
  let linkPreview = useLinkPreview(link);
  useEffect(() => {
    if (linkPreview.title && !getValue("tagline")) {
      updateValue("tagline", linkPreview.title);
    }
    if (linkPreview.description && !getValue("description")) {
      updateValue("description", linkPreview.description);
    }
    if (linkPreview.image && !getValue("logo")) {
      updateValue("logo", linkPreview.image);
    }
  }, [linkPreview]);
  let chosenCategory = categories.find((c) => c.id + "" === formValues.category_id);
  let chosenLayer = layers.find((l) => l.id + "" === formValues.layer_id);
  return (
    <form {...formProps}>
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
          <fieldset disabled={isSaving}>
            <input type="hidden" name="id"></input>
            <Input id="title" label="Title" required onBlur={syncValues} />
            <TextArea
              id="link"
              label="Link"
              rows={2}
              hint="Link to the official documentation."
              onBlur={(e: any) => setLink(e.target.value)}
            />
            <div className="columns">
              <div className="column col-6 col-sm-12">
                <Select
                  id="layer_id"
                  label="Tech Layer"
                  required
                  hint="Where in the tech stack does it live?"
                  onChange={syncValues}
                >
                  <option value="">Choose...</option>
                  {layers.map((layer) => (
                    <option key={layer.id} value={layer.id}>
                      {layer.title}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="column col-6 col-sm-12">
                <Select
                  id="category_id"
                  label="Category"
                  onChange={syncValues}
                  required
                  hint="How would you categorize it?"
                >
                  <option value="">Choose...</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <TextArea
              id="tagline"
              label="Tagline"
              rows={2}
              hint="How does it describe itself?"
              onBlur={syncValues}
            />
            <TextArea
              id="logo"
              label="Logo"
              rows={2}
              hint="A url to an image."
              onBlur={syncValues}
            />

            <TextArea
              id="description"
              label="Description"
              hint="You can write in markdown to format the description."
              onChange={syncValues}
            />
            {error && <p className="text-error">{error}</p>}
            <div className="form-actions">
              <button className="btn btn-link mr-2" type="button" onClick={() => onCancel()}>
                CANCEL
              </button>
              <button className="btn btn-primary">SAVE</button>
            </div>
          </fieldset>
        </div>
        <div className="column col-6 col-md-12 hide-mobile">
          <h5>Preview</h5>
          <TechCard tech={{ ...formValues, category: chosenCategory, layer: chosenLayer }} />
          {formValues.description && (
            <div className="card mt-2">
              <div className="card-header pt-2">
                <div className="float-left card-subtitle text-gray">Description</div>
              </div>
              <div className="card-body pt-1">
                <ReactMarkdown className="mt-2 mb-2">{formValues.description}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
