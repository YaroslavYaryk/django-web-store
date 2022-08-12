export const getValue = (array, type) => {
   for (let index = 0; index < array.length; index++) {
      if (array[index].type == type) {
         return array[index];
      }
   }
};
