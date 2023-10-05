import app from "../../src/app";
import supertest from "supertest";
import { cleanDb } from "../utils";
import { createFakeRental } from "../factories/rentals.factory";
import { mockRental } from "../unit/mocks/rentals-mock";

beforeAll(async () => {
  await cleanDb();
});

describe("Rentals Service Integration Tests", () => {
  const serve = supertest(app)
  it("should pass", async () => {
    const data = {
      date: mockRental[0].date,
      endDate: mockRental[0].endDate,
      closed: mockRental[0].closed,
    }
    await createFakeRental(data);
    const response = await serve.get('/rentals')
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        date: expect.any(String),
        endDate: expect.any(String),
        closed: expect.any(Boolean),
      })
    ]))
  })
})