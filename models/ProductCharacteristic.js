class ProductCharacteristic {
   constructor(
      id,
      productId,
      diagonalScreenId,
      diagonalScreen,
      screenTypeId,
      screenType,
      screenFrequencyId,
      screenFrequency,
      processonId,
      processor,
      operationSystemId,
      operationSystem,
      memoryCapacity,
      memoryCapacityId,
      memorySlots,
      memorySlotsId,
      hardDriveType,
      hardDriveTypeId,
      hardDriveCapacity,
      videoCard,
      videoCardId,
      videoCardCapacity,
      videoCardCapacityId,
      camera,
      color,
      weight,
      battery,
      manipulators,
      height,
      width,
      depth,
      corpMaterial,
      networkAdapters,
      wirelessConnection,
      inputOutput
   ) {
      this.id = id;
      this.productId = productId;
      this.diagonalScreenId = diagonalScreenId;
      this.diagonalScreen = diagonalScreen;
      this.screenTypeId = screenTypeId;
      this.screenType = screenType;
      this.screenFrequencyId = screenFrequencyId;
      this.screenFrequency = screenFrequency;
      this.processonId = processonId;
      this.processor = processor;
      this.operationSystemId = operationSystemId;
      this.operationSystem = operationSystem;
      this.memoryCapacity = memoryCapacity;
      this.memorySlots = memorySlots;
      this.memorySlotsId = memorySlotsId;
      this.hardDriveType = hardDriveType;
      this.hardDriveTypeId = hardDriveTypeId;
      this.hardDriveCapacity = hardDriveCapacity;
      this.memoryCapacityId = memoryCapacityId;
      this.videoCard = videoCard;
      this.videoCardId = videoCardId;
      this.videoCardCapacity = videoCardCapacity;
      this.videoCardCapacityId = videoCardCapacityId;
      this.camera = camera;
      this.color = color;
      this.weight = weight;
      this.battery = battery;
      this.manipulators = manipulators;
      this.height = height;
      this.width = width;
      this.depth = depth;
      this.corpMaterial = corpMaterial;
      this.networkAdapters = networkAdapters;
      this.wirelessConnection = wirelessConnection;
      this.inputOutput = inputOutput;
   }
}
export default ProductCharacteristic;
