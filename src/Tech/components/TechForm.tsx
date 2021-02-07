import { Input, TextArea, Select } from "@components/forms";
import React from "react";
import { useAppData } from "../../App/AppDataProvider";
import { getFormValues } from "../../common/utils";
import { saveTech, Tech } from "../tech.data";

export interface TechFormProps {
  techId: number;
  onSuccess: (tech: Tech) => void;
  onCancel: () => void;
}
export default function TechForm({ onSuccess, onCancel }) {
  let { layers = [], categories = [] } = useAppData();
  let [isSaving, setIsSaving] = React.useState(false);
  let [error, setError] = React.useState("");

  let onSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      let techToSave = getFormValues(event.target);
      let result = await saveTech(techToSave);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      setIsSaving(false);
      setError(err.message);
    }
  };

  return (
    <form style={{ maxWidth: "600px" }} onSubmit={onSubmit}>
      <fieldset disabled={isSaving}>
        <Input id="title" label="Title" required />
        <Select id="layer_id" label="Tech Layer" required>
          <option value="">Choose a value</option>
          {layers.map((layer) => (
            <option key={layer.id} value={layer.id}>
              {layer.title}
            </option>
          ))}
        </Select>
        <Select id="category_id" label="Category" required>
          <option value="">Choose a value</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </Select>
        <TextArea id="tagline" label="Tagline" rows={2} hint="How does it describe itself?" />
        <TextArea id="link" label="Link" rows={2} hint="Link to the official documentation." />
        <TextArea id="logo" label="Logo" rows={2} />

        <TextArea
          id="description"
          label="Description"
          hint="To format your text, you can write in markdown."
        />
        {error && <p className="text-error">{error}</p>}
        <div className="form-actions">
          <button className="btn btn-link" type="button" onClick={() => onCancel()}>
            CANCEL
          </button>
          <button className="btn btn-primary">SAVE</button>
        </div>
      </fieldset>
    </form>
  );
}
