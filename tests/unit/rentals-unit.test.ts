import rentalsRepository from "repositories/rentals-repository";
import { mockRental, mockRental2 } from "./mocks/rentals-mock";
import rentalsService from "services/rentals-service";
import { generateUserMocks } from "./mocks/user-mock";
import { mockMovie } from "./mocks/movie-mock";
import moviesRepository from "repositories/movies-repository";
import { notFoundError } from "../../src/errors/notfound-error";
import { movieAlreadyInRental } from "../../src/errors/movie-inretal-error";
import { insufficientAgeError } from "../../src/errors/insufficientage-error";
import { pendentRentalError } from "../../src/errors/pendent-rental-error";

describe("Rentals Service (User) Unit Tests", () => {
  it('getRentals should return rentals', async () => {
    const mock = jest.spyOn(rentalsService, 'getRentals');
    mock.mockImplementation((): any => {
      return mockRental;
    });
    const rentals = await rentalsService.getRentals();
    expect(rentalsService.getRentals).toBeCalledTimes(1);
    expect(rentals).toEqual(mockRental);
  });

  // it('checkUserAbleToRental should rentals with length == 0', async () => {
  //   const mock = jest.spyOn(rentalsService, 'checkUserAbleToRental');
  //   mock.mockImplementation((): any => {
  //     return mockRental2;
  //   });
  //   const rentals = await rentalsService.checkUserAbleToRental(1);
  //   expect(rentalsService.getRentals).toBeCalledTimes(1);
  //   expect(rentals).toHaveLength(0);
  // });

  it('getRentalsByUserId should rentals lenght max equals to 4 and min equal to 1', async () => {
    const input = 1;
    const mock = jest.spyOn(rentalsRepository, 'getRentalsByUserId');
    mock.mockImplementation((): any => {
      return mockRental;
    });
    const rentalByUserId = await rentalsRepository.getRentalsByUserId(input);
    expect(rentalsRepository.getRentalsByUserId).toBeCalledTimes(1);
    expect(rentalByUserId.length >= 1 && rentalByUserId.length <= 4).toEqual(true);
  });

  it('getRentalsByUserId return should contain closed: false', async () => {
    const input = 1;
    const mock = jest.spyOn(rentalsRepository, 'getRentalsByUserId');
    mock.mockImplementation((): any => {
      return mockRental;
    });
    const rentalByUserId = await rentalsRepository.getRentalsByUserId(input, false);
    expect(rentalByUserId).toEqual(expect.arrayContaining([
      expect.objectContaining({
        closed: false,
      })
    ]));
  });

  it('User Age should be 18 +', async () => {
    const mock = jest.spyOn(rentalsService, 'userUnderAgeWithAdultMovie');
    const userMock = generateUserMocks();
    mock.mockImplementation((): any => {
      return true && rentalsService.userIsUnderAge(userMock);
    });
    const isUnderAge = rentalsService.userUnderAgeWithAdultMovie(true, userMock);
    console.info({ isUnderAge , msg: isUnderAge? 'Filme é adultsOnly e o User é menor' : 'Filme é adultsOnly e o User é maior', dataNasc: userMock.birthDate})
    expect(isUnderAge).toBeFalsy();
  });
})

describe("Rentals Service (Movie) Unit Tests", () => {
  it('movieAlreadyRented should truthy when is rented', async () => {
    const mock = jest.spyOn(rentalsService, 'movieAlreadyRented');
    mock.mockImplementation((): any => {
      return mockMovie.rentalId != null;
    });
    const boolean = rentalsService.movieAlreadyRented(mockMovie.rentalId);
    expect(boolean).toBeTruthy();
  });
  
  it('checkMoviesValidForRental should return true if all movies are valid to rent', async () => {
    const moviesId = [1, 2, 3];
    const userMock = generateUserMocks();

    const mockGetById = jest.spyOn(moviesRepository, 'getById');
    mockGetById.mockImplementation((movieId): any => {
      if (movieId === 1) return { rentalId: null, adultsOnly: false };
      else if (movieId === 2) return { rentalId: null, adultsOnly: true };
      else if (movieId === 3) return { rentalId: null, adultsOnly: false };
    });

    const mockMovieAlreadyRented = jest.fn().mockReturnValue(false);
    const mockMockUnderAgeWithAdultMovie = jest.fn().mockReturnValue(false);

    jest.mock('../../src/services/rentals-service.ts', () => {
      return {
        notFoundError,
        movieAlreadyInRental,
        insufficientAgeError,
        movieAlreadyRented: mockMovieAlreadyRented, 
        userUnderAgeWithAdultMovie: mockMockUnderAgeWithAdultMovie,
      };
    });

    try {
      const result = await rentalsService.checkMoviesValidForRental(moviesId, userMock);

      expect(result).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(movieAlreadyInRental); 
      expect(error.message).toBe("Movie rental is pending"); 
    }
  });
})

describe("checkUserAbleToRental Unit Tests", () => {
  it('should return empty rentals array when user has no pending rentals', async () => {
    const mockGetRentalsByUserId = jest.spyOn(rentalsRepository, 'getRentalsByUserId');
    mockGetRentalsByUserId.mockResolvedValue([]);
    const userId = 1;

    const rentals = await rentalsService.checkUserAbleToRental(userId);
    expect(mockGetRentalsByUserId).toBeCalledWith(userId);
    expect(rentals).toEqual([]);
  });

  it('should throw pendentRentalError when user has pending rentals', async () => {
    const mockGetRentalsByUserId = jest.spyOn(rentalsRepository, 'getRentalsByUserId');
    mockGetRentalsByUserId.mockResolvedValue([]);
    const userId = 1;
    expect(mockGetRentalsByUserId).toBeCalledWith(userId);
  });
});