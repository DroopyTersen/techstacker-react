import { Input, TextArea, Select } from "@components/forms";
import useForm from "@hooks/useForm";
import useLinkPreview from "@hooks/useLinkPreview";
import React, { useEffect, useState } from "react";
import { useAppData } from "../../App/AppDataProvider";
import { saveTech, Tech } from "../tech.data";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import TechCard from "./TechCard";

export interface TechFormProps {
  techId: number;
  onSuccess: (tech: Tech) => void;
  onCancel: () => void;
}

export default function TechForm({ onSuccess, onCancel }) {
  let { layers = [], categories = [] } = useAppData();
  let { formProps, error, isSaving, getValue, updateValue, onBlur, formValues } = useForm({
    onSuccess,
    onSave: saveTech,
  });
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
  console.log("🚀 | TechForm | chosenCategory", chosenCategory, formValues);
  return (
    <form {...formProps}>
      <div className="layout two-column-even">
        <div>
          <fieldset disabled={isSaving}>
            <Input id="title" label="Title" required onBlur={onBlur} />
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
                  onChange={onBlur}
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
                <Select id="category_id" label="Category" required onChange={onBlur}>
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
              onBlur={onBlur}
            />
            <TextArea id="logo" label="Logo" rows={2} hint="A url to an image." onBlur={onBlur} />

            <TextArea
              id="description"
              label="Description"
              hint="You can write in markdown to format the description."
              onChange={onBlur}
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
        <div>
          <TechCard tech={formValues} />
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
