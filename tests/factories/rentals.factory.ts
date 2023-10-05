import { Rental } from "@prisma/client";
import prisma from "../../src/database/index";

type RentalWithOutId = Omit<Rental, "id" | "userId">

export async function createFakeRental(data: RentalWithOutId){
    return await prisma.rental.create({ data });
}