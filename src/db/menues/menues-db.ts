import { v4 as uuidv4 } from 'uuid';

export const menuesDb = [
  {
    id: uuidv4(),
    name: "Breakfast Menu",
    items: ["Pancakes", "Omelette"],
  },
  {
    id: uuidv4(),
    name: "Lunch Menu",
    items: ["Burger", "Salad"],
  },
  {
    id: uuidv4(),
    name: "Dinner Menu",
    items: ["Steak", "Pasta"],
  },
];
