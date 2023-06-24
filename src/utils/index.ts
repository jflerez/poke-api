export const removeEmpty = (dataObject: Object) => {
  return JSON.parse(JSON.stringify(dataObject, (k, v) => v ?? undefined));
};
