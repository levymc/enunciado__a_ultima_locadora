import { Movie } from "@prisma/client";


export const mockMovie: Movie = {
    id: 1,
    name: 'movie',
    adultsOnly: true,
    rentalId: 1,
}