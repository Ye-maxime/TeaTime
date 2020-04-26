const { server } = require('../index')
const request = require("supertest")
const database = require('../config/database')
const { initStore, initDrink } = require('../models/index')
const { redis } = require('../config/redis')

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

    it("should signup", async () => {
        const newUser = {
            firstname: 'maxime',
            lastname: 'Ye',
            email: 'yzm@yzm.com',
            password: 'pwd'
        };
        await request(server).post("/v1/account/signup")
            .send(newUser)
            .then((response) => {
                console.log(`should signup response = ${JSON.stringify(response.body)}`)
                expect(response.body.success).toBe(true);
                expect(response.body.email).toBe('yzm@yzm.com');
            })
            .catch(err => {
                // write test for failure here
                console.log(`should signup : error = ${err}`)
            });
    });

    it("should not signup due to used account email", async () => {
        const newUser = {
            firstname: 'maxime2',
            lastname: 'Ye2',
            email: 'yzm@yzm.com',
            password: 'pwd2'
        };
        await request(server).post("/v1/account/signup")
            .send(newUser)
            .then((response) => {
                console.log(`should signup response = ${JSON.stringify(response.body)}`)
                expect(response.body.success).toBe(false);
                expect(response.body.error).toBe('Email is already registered!');
            })
            .catch(err => {
                console.log(`should not signup due to used account email : error = ${err}`)
            });
    });

    it("should login", async () => {
        const data = {
            email: 'yzm@yzm.com',
            password: 'pwd'
        };
        await request(server).post("/v1/account/login")
            .send(data)
            .then((response) => {
                // console.log(`should login response = ${JSON.stringify(response.body)}`)
                expect(response.body.success).toBe(true);
                expect(response.body.email).toBe('yzm@yzm.com');
            })
            .catch(err => {
                console.log(`should login : error = ${err}`)
            });
    });

    it("should not login due to wrong email", async () => {
        const data = {
            email: 'yzm2@yzm2.com',
            password: 'pwd'
        };
        await request(server).post("/v1/account/login")
            .send(data)
            .then((response) => {
                // console.log(`should login response = ${JSON.stringify(response.body)}`)
                expect(response.body.success).toBe(false);
                expect(response.body.error).toBe('Account does not exist!');
            })
            .catch(err => {
                console.log(`should not login due to wrong email : error = ${err}`)
            });
    });

    it("should not login due to wrong pwd", async () => {
        const data = {
            email: 'yzm@yzm.com',
            password: 'wrongPwd'
        };
        await request(server).post("/v1/account/login")
            .send(data)
            .then((response) => {
                // console.log(`should login response = ${JSON.stringify(response.body)}`)
                expect(response.body.success).toBe(false);
                expect(response.body.error).toBe('Password not correct!');
            })
            .catch(err => {
                console.log(`should not login due to wrong pwd : error = ${err}`)
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

    it("should get account informations from redis", async () => {
        const data = {
            accountId: 1
        };
        await request(server).post("/v1/account/getAccountInfos")
            .set('Authorization', 'Bearer ' + token)
            .send(data)
            .then((response) => {
                console.log(`get account informations response = ${JSON.stringify(response.text)}`)
                const res = JSON.parse(response.text);
                expect(res.email).toBe('yzm@yzm.com');
                expect(res.firstname).toBe('maxime');
                expect(res.lastname).toBe('Ye');
            })
            .catch(err => {
                console.log(`should get account informations from redis : error = ${err}`)
            });
    });

    it("should get account informations from database", async () => {
        // 删除redis 内的key
        redis.del('account-1');

        const data = {
            accountId: 1
        };
        await request(server).post("/v1/account/getAccountInfos")
            .set('Authorization', 'Bearer ' + token)
            .send(data)
            .then((response) => {
                console.log(`get account informations response = ${JSON.stringify(response.body)}`)
                expect(response.body.email).toBe('yzm@yzm.com');
                expect(response.body.firstname).toBe('maxime');
                expect(response.body.lastname).toBe('Ye');
            })
            .catch(err => {
                console.log(`should get account informations from database : error = ${err}`)
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
                quantity: 1,
                stock: 1
            }],
            total: 12
        }

        const placeOrderResponse = await request(server).post("/v1/orders/saveOrder").set('Authorization', 'Bearer ' + token).send(newOrder);
        expect(placeOrderResponse.body.success).toBe(true);
        // const response = await request(server).post("/v1/orders/getOrders").set('Authorization', 'Bearer ' + token).send({ accountId: 1 });
        // expect(response.body.length).toBe(1);
        // const response2 = await request(server).post("/v1/order_detail/1").set('Authorization', 'Bearer ' + token);
        // expect(response2.body.length).toBe(1);
        // expect(response2.body[0].quantity).toBe(1);
    });
});