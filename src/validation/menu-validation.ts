import { menusDb } from "../db/menus/menus-db";

const getValidDishesForTime = (time: string) => {
  const [hour] = time.split(':').map(Number);

  if (hour >= 0 && hour < 10) {
    const breakfastMenu = menusDb.find(menu => menu.name === "Breakfast Menu");
    
    if (!breakfastMenu || breakfastMenu.dishes.length === 0) return [];

    return breakfastMenu.dishes;
  }

  if (hour >= 10 && hour < 16) {
    const lunchMenu = menusDb.find(menu => menu.name === "Lunch Menu");
    
    if (!lunchMenu || lunchMenu.dishes.length === 0) return [];

    return lunchMenu.dishes;
  }  

  const dinnerMenu = menusDb.find(menu => menu.name === "Dinner Menu");
  
  if (!dinnerMenu || dinnerMenu.dishes.length === 0) return [];

  return dinnerMenu.dishes;
};

export const isValidDishForTime = (dishes: string[], time:string) => {
  const allowedDishes = getValidDishesForTime(time);
  return dishes.every(dish => allowedDishes.includes(dish));
};
