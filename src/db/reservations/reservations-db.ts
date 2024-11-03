import type { ReservationSchema } from "../../validation/reservations.schema";

export type Reservation = ReservationSchema & {
  id: string;
  menuId: string;
};

export const reservationsDb: Reservation[] = [
  {
    id: "f576ecc3-b655-488a-b83d-dfbd0182ba5d",
    customerName: "Sting",
    tableNumber: 1,
    date: "2024-11-23",
    time: "08:00",
    menuId: "9de3faf7-36f3-4449-b4b5-7c3393f00e10",
  },
  {
    id: "f29f33f2-d230-4901-93d8-7145baf409a7",
    customerName: "Madonna",
    tableNumber: 6,
    date: "2024-12-10",
    time: "13:00",
    menuId: "fd9c2bf1-8540-4ed9-9be7-155877262259",
  },
  {
    id: "b7f24239-4698-4efc-94e3-18eaa3503677",
    customerName: "Santa Claus",
    tableNumber: 24,
    date: "2024-12-24",
    time: "19:00",
    menuId: "42995559-2641-4d33-85e9-9043373fc6bf",
  },
];
