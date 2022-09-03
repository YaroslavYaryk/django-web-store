const getCharacteristicArray = (item, product) => {
   return [
      {
         label: "Діагональ екрана",
         characteristic: `${item.diagonalScreen.name}''`,
         slug: item.diagonalScreen.slug,
         charactType: "screenDiagonal",
         type: 1,
      },
      {
         label: "Тип матриці",
         characteristic: item.screenType.name,
         slug: item.screenType.slug,
         charactType: "screenType",
         type: 2,
      },
      {
         label: "Частота оновлення екрана",
         characteristic: item.screenFrequency.name,
         slug: item.screenFrequency.slug,
         charactType: "screenFrequency",
         type: 1,
      },
      {
         label: "Оперативна пам'ять",
         characteristic: `${item.memoryCapacity.name} Гб`,
         slug: item.memoryCapacity.slug,
         charactType: "memoryCapacity",
         type: 2,
      },
      {
         label: "Вбудована пам'ять",
         characteristic: `${item.hardDriveCapacity.name} Гб`,
         slug: item.hardDriveCapacity.slug,
         charactType: "hardDriveCapacity",
         type: 1,
      },
      {
         label: "Тип вбудованої пам'яті",
         characteristic: `${item.hardDriveType.name}`,
         slug: item.hardDriveType.slug,
         charactType: "hardDriveType",
         type: 2,
      },
      {
         label: "Операційна система",
         characteristic: item.operationSystem.name,
         slug: item.operationSystem.slug,
         charactType: "operationSystem",
         type: 1,
      },
      {
         label: "Процесор",
         characteristic: item.processor.name,
         slug: item.processor.slug,
         charactType: "processor",
         type: 2,
      },
      {
         label: "Кількість слотів оперативної пам'яті",
         characteristic: item.memorySlots.name,
         slug: item.memorySlots.slug,
         charactType: "memorySlots",
         type: 1,
      },
      {
         label: "Відеокарта",
         characteristic: item.videoCard.name,
         slug: item.videoCard.slug,
         charactType: "videoCard",
         type: 2,
      },
      {
         label: "Обсяг памяті відеокарти",
         characteristic: item.videoCardCapacity.name,
         slug: item.videoCardCapacity.slug,
         charactType: "videoCardCapacity",
         type: 1,
      },
      {
         label: "Стандарти зв'язку",
         characteristic: item.networkAdapters,
         type: 2,
      },
      {
         label: "Колір",
         characteristic: item.color,
         type: 1,
      },
      {
         label: "Вага",
         characteristic: `${item.weight} кг`,
         type: 2,
      },
      {
         label: "Ємність акумулятора",
         characteristic: item.battery,
         type: 1,
      },
      {
         label: "Мережеві адаптери",
         characteristic: item.networkAdapters,
         type: 2,
      },
      {
         label: "Роз'єми та порти введення-виведення",
         characteristic: item.inputOutput,
         type: 1,
      },
      {
         label: "Короткі харастеристика",
         characteristic: product.shortDescription,
         type: 2,
      },
      {
         label: "Безпровідний зв'язок",
         characteristic: item.wirelessConnection,
         type: 1,
      },
      {
         label: "Маніпулятори",
         characteristic: item.manipulators,
         type: 2,
      },
      {
         label: "Габарити (Ш х Г х В)",
         characteristic: `${item.height} x ${item.depth} x ${item.width} mm`,
         type: 1,
      },
      {
         label: "Гарантія",
         characteristic: `${product.warranty} місяців`,
         type: 2,
      },
   ];
};

export default getCharacteristicArray;
