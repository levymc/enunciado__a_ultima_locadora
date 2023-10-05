import rentalsRepository from "repositories/rentals-repository";
import { mockRental } from "./mocks/rentals-mock";
import rentalsService from "services/rentals-service";
import { userMock } from "./mocks/user-mock";
import { mockMovie } from "./mocks/movie-mock";


describe("Rentals Service (User) Unit Tests", () => {
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
    const input = 1;
    const mock = jest.spyOn(rentalsService, 'userUnderAgeWithAdultMovie');
    mock.mockImplementation((): any => {
      return true && rentalsService.userIsUnderAge(userMock);
    });
    const isUnderAge = rentalsService.userUnderAgeWithAdultMovie(true, userMock);
    expect(isUnderAge).toEqual(true);
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

})