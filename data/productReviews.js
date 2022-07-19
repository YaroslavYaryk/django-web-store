import ProductReview from "../models/ProductReview";
import ProductReply from "../models/ProductReply";
import User from "../models/User";
const PRODUCT_REVIEWS = [
   new ProductReview(
      1,
      1,
      new User(14, "duhanov2003@gmail.com", "yaryk31", "Ярослав Диханов"),
      [
         {
            id: 1,
            url:
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7FTzj_gto4O8-IBt_imgqp3SkXetQ3jeSVA&usqp=CAU",
         },
         // {
         //    id: 2,
         //    url:
         //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7FTzj_gto4O8-IBt_imgqp3SkXetQ3jeSVA&usqp=CAU",
         // },
      ],
      "product is really useful, product is really , product is really useful, product is really useful",
      "Ціна, можливості",
      "Поки не знайшов",
      4,
      "2022-08-10T09:52:44.871486Z",
      5,
      [
         new ProductReply(
            2,
            "good one",
            new User(14, "duhanov2003@gmail.com", "yaryk31", "Ярослав Диханов"),
            "2022-08-10T09:52:44.871486Z"
         ),
         new ProductReply(
            3,
            "i guess it is an appropriate commnet",
            new User(14, "duhanov2003@gmail.com", "yaryk31", "Ярослав Диханов"),
            "2022-08-10T09:52:44.871486Z"
         ),
      ]
   ),
   new ProductReview(
      2,
      1,
      new User(14, "duhanov2003@gmail.com", "yaryk31", "Ярослав Диханов"),
      [
         {
            id: 3,
            url:
               "https://specifications-pro.com/wp-content/uploads/2020/04/Google-Pixel-5-XL-1.jpg",
         },
         {
            id: 4,
            url:
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7FTzj_gto4O8-IBt_imgqp3SkXetQ3jeSVA&usqp=CAU",
         },
      ],
      "Хороший продукт",
      " можливості,  можливості можливості можливості можливості можливості можливості можливості",
      "Немвє",
      3,
      "2022-07-11T09:52:44.871486Z",
      0
   ),
   new ProductReview(
      3,
      1,
      new User(14, "duhanov2003@gmail.com", "yaryk31", "Ярослав Диханов"),
      [
         {
            id: 5,
            url:
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7FTzj_gto4O8-IBt_imgqp3SkXetQ3jeSVA&usqp=CAU",
         },
         {
            id: 6,
            url:
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-1pcrkRaivBK6P63e-iMyxL4rKtcivA5iQ&usqp=CAU",
         },
      ],
      "product is nice",
      "Ціна,",
      "Багато",
      5,
      "2022-09-10T09:52:44.871486Z",
      4
   ),
];

export default PRODUCT_REVIEWS;
