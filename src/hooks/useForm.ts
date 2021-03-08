import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm as useHookForm } from "react-hook-form";

export const getFormValues = (form) => {
  let formData = new FormData(form);
  var object = {};
  formData.forEach((value, key) => (object[key] = value));
  return object;
};

interface UseSaveFormParams<TFormValues = any> {
  onSave: (formValues: TFormValues) => Promise<TFormValues>;
  onSuccess: (result: TFormValues) => void;
  initial: TFormValues;
}

export function useSaveForm<TFormValues = any>({
  onSave,
  onSuccess,
  initial,
}: UseSaveFormParams<TFormValues>) {
  const [isSaving, setIsSaving] = useState(false);
  const form = useHookForm({
    defaultValues: initial as any,
  });

  let onValidSubmit: SubmitHandler<TFormValues> = async (data) => {
    try {
      setIsSaving(true);
      let saveResult = await onSave(data as TFormValues);
      onSuccess(saveResult);
    } catch (err) {
      setIsSaving(false);
      form.setError("form", err);
    }
  };
  let onSubmit = form.handleSubmit(onValidSubmit);

  const getField = (name: string) => {
    return {
      name,
      errors: form.errors[name],
      defaultValue: initial[name],
    };
  };

  return {
    ...form,
    isSaving,
    onSubmit,
  };
}

export default function useForm<T = any>({ onSave, onSuccess, initial = {} }) {
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

  let updateValue = (key, value, syncState = true) => {
    if (formRef.current) {
      let input = formRef.current.querySelector(`[name='${key}']`);
      if (input) {
        input.value = value;
      }
      if (syncState) {
        syncValues();
      }
    }
  };

  let setValues = (updates) => {
    Object.keys(updates).forEach((key) => {
      updateValue(key, updates[key], false);
    });
    syncValues();
  };

  useEffect(() => {
    if (initial) {
      setValues(initial);
    }
  }, []);

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
    syncValues: () => syncValues(),
    formValues,
  };
}
