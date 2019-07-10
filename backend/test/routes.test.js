const {server} = require('../index')
const request = require("supertest")
const database = require('../config/database')
const {initStore, initDrink} = require('../models/index')

let socket

// close the server after all test
afterAll(() => {
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


  it("should get drinks", async () => {
    const response = await request(server).get("/v1/drinks");
    expect(response.body.length).toBe(6);
  });

  it("should create a drink", async () => {
    const newDrink = {name: 'milk shake'}
    const response = await request(server).post("/v1/drinks").send(newDrink);
    expect(response.body.name).toBe('milk shake');
  });

  it("should get stores", async () => {
    const response = await request(server).get("/v1/stores");
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('Teatime Opéra');
    expect(response.body[1].name).toBe('Teatime Haussmann');
  });

  it("should create, find and get orders", async () => {
    const newOrder = {
      products: [{
        id: 1,
        name: "Brown Sugar Deerioca Fresh Milk",
        price: "12",
        collection: "BROWN",
        quantity: 1
      }],
      total: 12
    }
    await request(server).post("/v1/orders").send(newOrder);
    const response = await request(server).get("/v1/orders");
    expect(response.body.length).toBe(1);
    const response2 = await request(server).post("/v1/order_detail/1");
    expect(response2.body.length).toBe(1);
    expect(response2.body[0].quantity).toBe(1);
  });

});
