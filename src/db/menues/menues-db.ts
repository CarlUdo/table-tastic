type MenuName = "Breakfast Menu" | "Lunch Menu" | "Dinner Menu";

export type Menu = {
  id: string;
  name: MenuName;
  dishes: string[];
};

export const menuesDb: Menu[] = [
  {
    id: "9de3faf7-36f3-4449-b4b5-7c3393f00e10",
    name: "Breakfast Menu",
    dishes: ["Pancakes", "Omelette"],
  },
  {
    id: "fd9c2bf1-8540-4ed9-9be7-155877262259",
    name: "Lunch Menu",
    dishes: ["Burger", "Salad"],
  },
  {
    id: "42995559-2641-4d33-85e9-9043373fc6bf",
    name: "Dinner Menu",
    dishes: ["Steak", "Pasta"],
  },
];
