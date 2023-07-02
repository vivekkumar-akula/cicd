const assert = require('assert');

describe("Project Operations", () => {
  before(() => {
    console.log("This part executes once before all tests");
  });

  after(() => {
    console.log("This part executes once after all tests");
  });

  describe("Addition", () => {
    beforeEach(() => {
      console.log("Executes before every test");
    });

    it("Returns 5 when adding 2 + 3", () => {
      assert.equal(2 + 3, 5);
    });

    it("Returns 6 when adding 2 + 4", () => {
      assert.equal(2 + 4, 6);
    });
  });

  describe("Multiplication", () => {
    beforeEach(() => {
      console.log("Executes before every test");
    });

    it("Returns 6 when multiplying 2 * 3", () => {
      assert.equal(2 * 3, 6);
    });

    it("Returns 8 when multiplying 2 * 4", () => {
      assert.equal(2 * 4, 8);
    });
  });
});
