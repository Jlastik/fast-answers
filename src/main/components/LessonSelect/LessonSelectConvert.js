export const lessonConvert = (lessons) => {
  let options = [];

  lessons.forEach((element) => {
    options.push({
      value: element.id,
      label: element.name,
    });
  });
  return options;
};
