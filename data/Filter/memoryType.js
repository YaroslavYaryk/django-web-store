import MemoryType from "../../models/Filter/MemoryType";

const MEMORY_TYPES = [
   new MemoryType(1, "hdd", "hdd", "non-volatile data storage device"),
   new MemoryType(
      2,
      "ssd",
      "ssd",
      "a type of storage device used in computers"
   ),
];

export default MEMORY_TYPES;
