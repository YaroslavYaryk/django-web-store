class ProductCharacteristic {
   constructor(
      id,
      productId,
      diagonalScreen,
      screenType,
      screenFrequency,
      processor,
      operationSystem,
      memoryCapacity,
      memorySlots,
      hardDriveType,
      hardDriveCapacity,
      videoCard,
      videoCardCapacity,
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
      this.diagonalScreen = diagonalScreen;
      this.screenType = screenType;
      this.screenFrequency = screenFrequency;
      this.processor = processor;
      this.operationSystem = operationSystem;
      this.memoryCapacity = memoryCapacity;
      this.memorySlots = memorySlots;
      this.hardDriveType = hardDriveType;
      this.hardDriveCapacity = hardDriveCapacity;
      this.videoCard = videoCard;
      this.videoCardCapacity = videoCardCapacity;
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
