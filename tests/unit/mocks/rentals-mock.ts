import { Rental } from "@prisma/client";

export const mockRental: Rental[] = [
    {
        id: 2,
        date: new Date('03/10/2023'),
        endDate: new Date(),
        userId: 1,
        closed: false,
    },
    {
        id: 1,
        date: new Date('03/10/2023'),
        endDate: new Date(),
        userId: 1,
        closed: false,
    },
    {
        id: 3,
        date: new Date('03/10/2023'),
        endDate: new Date(),
        userId: 1,
        closed: false,
    },
    {
        id: 4,
        date: new Date('03/10/2023'),
        endDate: new Date(),
        userId: 1,
        closed: false,
    },
];

export const mockRental2: Rental[] = []