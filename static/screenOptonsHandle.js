const getScreenOptions = (selectedOptions) => {
   var array = [];
   selectedOptions.forEach((element) => {
      var index = array.findIndex((elem) => elem.name == element.type);
      if (index != -1) {
         array[index].value.push(element.slug);
      } else {
         array.push({
            name: element.type,
            value: [element.slug],
         });
      }
   });
   return array;
};

export default getScreenOptions;
