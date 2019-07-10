const {server} = require('../index')
const request = require("supertest")
const database = require('../config/database')
const {initStore, initDrink} = require('../models/index')

// close the server after each test
afterEach(() => {
  server.close();
})

describe("Routes: index", () => {

  beforeEach((done) => {
    database.sync({force: true})
      .then(async () => {
        await initStore()
        await initDrink()
        done()
      })
      .catch((error) => {
        done(error);
      });
  })


  it("should get all drinks", async () => {
    const response = await request(server).get("/v1/drinks");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBe(6);
  });

  it("should get all stores", async () => {
    const response = await request(server).get("/v1/stores");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    console.log(response.body)
    console.log("!!!!!!!!!")
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('Teatime Opéra');
    expect(response.body[1].name).toBe('Teatime Haussmann');
  });

});
