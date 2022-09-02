import ScreenType from "../../models/Filter/ScreenType";

const SCREEN_TYPES = [
   new ScreenType(
      1,
      "ips",
      "ips",
      "a form of network security that works to detect and prevent identified threats"
   ),
   new ScreenType(
      2,
      "oled",
      "oled",
      " display technology based on the use of an organic substance, typically a polymer, as the semiconductor material in light-emitting diodes (LEDs)"
   ),
   new ScreenType(
      3,
      "led",
      "led",
      "a semiconductor light source that emits light when current flows through it"
   ),
   new ScreenType(
      4,
      "VA",
      "va",
      "VA stands for vertical alignment and is a a type of LED panel display technology."
   ),
   new ScreenType(
      5,
      "TN",
      "tn",
      "TN stands for twisted nematic. This is a type of LED panel display technology."
   ),
];

export default SCREEN_TYPES;
