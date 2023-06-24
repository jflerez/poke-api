import { removeEmpty } from "../utils";

const mapper = (source: any, destination: any, isRemoveEmpty = true) => {
  let outputs = [];
  if (!Array.isArray(source)) {
    return buildMapper(source, destination, isRemoveEmpty);
  }
  for (let data in source) {
    outputs.push(buildMapper(source[data], destination, isRemoveEmpty));
  }
  return outputs;
};

const setMapper = (source: any, destination: any) => {
  for (let i in source) {
    destination[i] = source[i];
  }
  return destination;
};

const buildMapper = (source: any, destination: any, isRemoveEmpty = true) => {
  console.log("destination: ", destination);
  const isDTO = destination?.prototype?.constructor.length > 0;
  const data = !isDTO
    ? setMapper(source, new destination())
    : new destination(source);
  return isRemoveEmpty ? removeEmpty(data) : data;
};

export default mapper;
