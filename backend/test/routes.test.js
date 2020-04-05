const { server } = require('../index')
const request = require("supertest")
const database = require('../config/database')
const { initStore, initDrink } = require('../models/index')

// close the server after all test
afterAll(() => {
    server.close();
})

// 不需要token的路由
describe("Routes: index", () => {

    beforeAll((done) => {
        database.sync({ force: true })
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
        const newDrink = { name: 'milk shake' }
        const response = await request(server).post("/v1/drinks").send(newDrink);
        expect(response.body.name).toBe('milk shake');
    });

    it("should get stores", async () => {
        const response = await request(server).get("/v1/stores");
        expect(response.body.length).toBe(2);
        expect(response.body[0].name).toBe('Teatime Opéra');
        expect(response.body[1].name).toBe('Teatime Haussmann');
    });

    it("should login", async () => {
        const newUser = {
            firstname: 'maxime',
            lastname: 'Ye',
            email: 'yzm@yzm.com',
            password: 'pwd'
        };
        await request(server).post("/v1/account/signup")
            .send(newUser)
            .then((response) => {
                console.log(`should login response = ${JSON.stringify(response.body)}`)
                expect(response.body.success).toBe(true);
                expect(response.body.email).toBe('yzm@yzm.com');
            })
            .catch(err => {
                // write test for failure here
                console.log(`Error ${err}`)
            });
    });
});

// 用户行为
describe("Session action: user", () => {
    let token;

    beforeAll((done) => {
        database.sync({ force: true })
            .then(async () => {
                const newUser = {
                    firstname: 'maxime',
                    lastname: 'Ye',
                    email: 'yzm@yzm.com',
                    password: 'pwd'
                };
                await initStore();
                await initDrink();
                await request(server).post("/v1/account/signup").send(newUser).then((response) => {
                    token = response.body.token; // save the token!
                });
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it("should create, find and get orders", async () => {
        const newOrder = {
            accountId: 1,
            products: [{
                id: 1,
                name: "Brown Sugar Deerioca Fresh Milk",
                price: "12",
                collection: "BROWN",
                quantity: 1
            }],
            total: 12
        }

        await request(server).post("/v1/orders/saveOrder").set('Authorization', 'Bearer ' + token).send(newOrder);
        const response = await request(server).post("/v1/orders/getOrders").set('Authorization', 'Bearer ' + token).send({ accountId: 1 });
        expect(response.body.length).toBe(1);
        const response2 = await request(server).post("/v1/order_detail/1").set('Authorization', 'Bearer ' + token);
        expect(response2.body.length).toBe(1);
        expect(response2.body[0].quantity).toBe(1);
    });
});