export const getFormValues = (form) => {
  let formData = new FormData(form);
  var object = {};
  formData.forEach((value, key) => (object[key] = value));
  return object;
};
