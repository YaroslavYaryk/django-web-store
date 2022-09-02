import OperatSystem from "../../models/Filter/OperatSystem";

const OPERATION_SYSTEMS = [
   new OperatSystem(
      1,
      "linux",
      "linux",
      "An open source operating system (OS)."
   ),
   new OperatSystem(
      2,
      "windows",
      "windows",
      "Windows is an operating system designed by Microsoft."
   ),
   new OperatSystem(
      3,
      "macOs",
      "macOs",
      "macOS is the operating system that powers every Mac"
   ),
   new OperatSystem(
      4,
      "android",
      "android",
      "a mobile operating system based on a modified version of the Linux kernel and other open source software"
   ),
];

export default OPERATION_SYSTEMS;
