export const moduleConvert = (modules) => {
  let options = [];

  modules.forEach((element) => {
    options.push({
      value: element.id,
      label: element.name,
    });
  });
  return options;
};
