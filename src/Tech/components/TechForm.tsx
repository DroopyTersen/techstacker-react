import { Input, TextArea, Select } from "@components/forms";
// import useForm from "@hooks/useForm";
import useLinkPreview from "@hooks/useLinkPreview";
import React, { useEffect, useMemo } from "react";
import { Category, Layer } from "../../App/AppDataProvider";
import { saveTech, Tech, TechDto } from "../tech.data";
import ReactMarkdown from "react-markdown";
import TechCard from "./TechCard";
import { TagsInput } from "@components/tags";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSaveForm } from "@hooks/useForm";

export interface TechFormProps {
  layers: Layer[];
  categories: Category[];
  initial?: TechDto;
  onSuccess: (tech: Tech) => void;
  onCancel: () => void;
}

export default function TechForm({
  onSuccess,
  onCancel,
  initial = {},
  layers,
  categories,
}: TechFormProps) {
  const form = useSaveForm({
    onSave: saveTech,
    onSuccess,
    initial,
  });

  let [link, setLink] = React.useState("");
  let linkPreview = useLinkPreview(link);

  useEffect(() => {
    if (linkPreview.title && !form.getValues("tagline")) {
      form.setValue("tagline", linkPreview.title);
    }
    if (linkPreview.description && !form.getValues("description")) {
      form.setValue("description", linkPreview.description);
    }
    if (linkPreview.image && !form.getValues("logo")) {
      form.setValue("logo", linkPreview.image);
    }
  }, [linkPreview]);
  form.errors;

  let watchedValues = form.watch();
  let chosenCategory = categories.find((c) => c.id + "" === watchedValues?.category_id);
  let chosenLayer = layers.find((l) => l.id + "" === watchedValues?.layer_id);

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
          <fieldset disabled={form.isSaving}>
            <input type="hidden" name="id" ref={form.register}></input>
            <Input
              name="title"
              label="Title"
              ref={form.register({ required: true, minLength: 3 })}
              error={form.errors.title}
            />
            <TextArea
              name="link"
              label="Link"
              rows={2}
              hint="Link to the official documentation."
              ref={form.register({ required: true })}
              error={form.errors.link}
              onBlur={(e: any) => setLink(e.target.value)}
            />
            <div className="columns">
              <div className="column col-6 col-sm-12">
                <Select
                  name="layer_id"
                  label="Tech Layer"
                  ref={form.register({ required: true })}
                  error={form.errors["layer_id"]}
                  hint="Where in the tech stack does it live?"
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
                  name="category_id"
                  label="Category"
                  error={form.errors["category_id"]}
                  ref={form.register({ required: true })}
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
            <Controller
              name="tags"
              control={form.control}
              defaultValue={initial.tags}
              render={(props) => {
                return <TagsInput defaultValue={initial.tags} onChange={props.onChange} />;
              }}
            />
            <TextArea
              name="tagline"
              label="Tagline"
              rows={2}
              hint="How does it describe itself?"
              ref={form.register({
                maxLength: { value: 80, message: "Tagline should be less than 80 characters" },
              })}
              error={form.errors["tagline"]}
            />
            <TextArea
              ref={form.register}
              name="logo"
              label="Logo"
              rows={2}
              hint="A url to an image."
            />

            <TextArea
              name="description"
              label="Description"
              hint="You can write in markdown to format the description."
              ref={form.register}
            />
            {form?.errors?.form?.message && (
              <p className="text-error">{form?.errors?.form?.message}</p>
            )}
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
          <TechCard tech={{ ...watchedValues, category: chosenCategory, layer: chosenLayer }} />
          {form.getValues("description") && (
            <div className="card mt-2">
              <div className="card-header pt-2">
                <div className="float-left card-subtitle text-gray">Description</div>
              </div>
              <div className="card-body pt-1">
                <ReactMarkdown className="mt-2 mb-2">{form.getValues("description")}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
