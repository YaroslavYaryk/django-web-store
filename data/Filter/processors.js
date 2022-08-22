import Processor from "../../models/Filter/Processor";

const PROCESSORS = [
   new Processor(
      1,
      "intel core i5",
      "intel-core-i5",
      "The Intel Corei5 comes in variations of two to four cores, all supporting four different threads simultaneously."
   ),
   new Processor(2, "intel core i3", "intel-core-i3"),
   new Processor(3, "intel core i7", "intel-core-i7"),
   new Processor(4, "intel core i9", "intel-core-i9"),
   new Processor(5, "AMD Razen 5", "amd-razen-5"),
   new Processor(6, "AMD Razen 7", "amd-razen-7"),
   new Processor(7, "AMD Razen 9", "AMD-Razen-9"),
   new Processor(8, "snapdragon 765g", "snapdragon-765g","some proc"),
   new Processor(9, "Intel Celeron", "intel-celeron"),
   new Processor(10, "Intel Pentium", "intel-pentium"),
];

export default PROCESSORS;
