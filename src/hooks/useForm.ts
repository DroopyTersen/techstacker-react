import React from "react";

export const getFormValues = (form) => {
  let formData = new FormData(form);
  var object = {};
  formData.forEach((value, key) => (object[key] = value));
  return object;
};

export default function useForm({ onSave, onSuccess, initial = {} }) {
  let [isSaving, setIsSaving] = React.useState(false);
  let [error, setError] = React.useState("");
  let formRef = React.useRef(null);
  let [formValues, setFormValues] = React.useState<any>(initial);

  let onSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      let techToSave = getFormValues(event.target);
      let result = await onSave(techToSave);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      setIsSaving(false);
      setError(err.message);
    }
  };

  let updateValue = (key, value) => {
    if (formRef.current) {
      let input = formRef.current.querySelector(`[name='${key}']`);
      if (input) {
        input.value = value;
      }
      syncValues();
    }
  };

  let syncValues = () => {
    if (formRef.current) {
      setFormValues(getFormValues(formRef.current));
    }
  };
  let getValue = (key) => {
    if (formRef.current) {
      let input = formRef.current.querySelector(`[name='${key}']`);
      return input?.value || "";
    }
    return "";
  };

  let formProps = {
    onSubmit,
    ref: formRef,
  };
  return {
    error,
    isSaving,
    formProps,
    updateValue,
    getValue,
    onBlur: () => syncValues(),
    formValues,
  };
}
