import { NotFoundError } from "@exceptions";

describe('Should be throw an exceptions with 404 code', () => {
  expect(NotFoundError)
  .toBeInstanceOf(Error)
});
