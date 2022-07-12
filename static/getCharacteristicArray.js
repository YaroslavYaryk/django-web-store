const getCharacteristicArray = (item, product) => {
   return [
      {
         label: "Стандарти зв'язку",
         characteristic: item.networkAdapters,
         type: 1,
      },
      {
         label: "Діагональ екрана",
         characteristic: item.diagonalScreen,
         type: 2,
      },
      { label: "Тип матриці", characteristic: item.screenType, type: 1 },
      {
         label: "Частота оновлення екрана",
         characteristic: item.screenFrequency,
         type: 2,
      },
      {
         label: "Оперативна пам'ять",
         characteristic: item.memoryCapacity,
         type: 1,
      },
      {
         label: "Вбудована пам'ять",
         characteristic: `${item.hardDriveCapacity} ${item.hardDriveType}`,
         type: 2,
      },
      {
         label: "Операційна система",
         characteristic: item.operationSystem,
         type: 1,
      },
      { label: "Процесор", characteristic: item.processor, type: 2 },
      {
         label: "Кількість слотів оперативної пам'яті",
         characteristic: item.memorySlots,
         type: 1,
      },
      {
         label: "Відеокарта",
         characteristic: item.videoCard,
         type: 2,
      },
      {
         label: "Обсяг памяті відеокарти",
         characteristic: item.videoCardCapacity,
         type: 1,
      },
      {
         label: "Колір",
         characteristic: item.color,
         type: 2,
      },
      {
         label: "Вага",
         characteristic: `${item.weight} кг`,
         type: 1,
      },
      {
         label: "Ємність акумулятора",
         characteristic: item.battery,
         type: 2,
      },
      {
         label: "Мережеві адаптери",
         characteristic: item.networkAdapters,
         type: 1,
      },
      {
         label: "Роз'єми та порти введення-виведення",
         characteristic: item.inputOutput,
         type: 2,
      },
      {
         label: "Короткі харастеристика",
         characteristic: product.shortDescription,
         type: 1,
      },
      {
         label: "Безпровідний зв'язок",
         characteristic: item.wirelessConnection,
         type: 2,
      },
      {
         label: "Маніпулятори",
         characteristic: item.manipulators,
         type: 1,
      },
      {
         label: "Габарити (Ш х Г х В)",
         characteristic: `${item.height} x ${item.depth} x ${item.width} mm`,
         type: 2,
      },
      {
         label: "Гарантія",
         characteristic: `${product.warranty} місяців`,
         type: 1,
      },
   ];
};

export default getCharacteristicArray;
