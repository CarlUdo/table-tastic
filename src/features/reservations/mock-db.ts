import type { Reservation } from "./validation/index.schema";

export const createReservationsDatabase = (): Reservation[] => {
  return [
    {
      id: "f576ecc3-b655-488a-b83d-dfbd0182ba5d",
      customerName: "Sting",
      tableNumber: 1,
      date: "2024-11-23",
      time: "08:00",
    },
    {
      id: "f29f33f2-d230-4901-93d8-7145baf409a7",
      customerName: "Madonna",
      tableNumber: 6,
      date: "2024-12-10",
      time: "13:00",
    },
    {
      id: "b7f24239-4698-4efc-94e3-18eaa3503677",
      customerName: "Santa Claus",
      tableNumber: 24,
      date: "2024-12-24",
      time: "19:00",
    },
  ];
};
