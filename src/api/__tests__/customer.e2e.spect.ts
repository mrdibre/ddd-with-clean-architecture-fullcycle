import request from "supertest";
import { app } from "../express";
import { sequelize } from "../sequelize";

describe("E2E tests for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "Anytown",
          number: 123,
          zip: "12345"
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.city).toBe("Anytown");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("12345");
  });

  it("should not create a customer", async () => {
    const response = await request(app)
        .post("/customer")
        .send({
          name: "John",
        });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "Anytown",
          number: 123,
          zip: "12345"
        },
      });

    await request(app)
      .post("/customer")
      .send({
        name: "Jane",
        address: {
          street: "Street 2",
          city: "Anytown 2",
          number: 1234,
          zip: "123456"
        },
      });

    const response = await request(app).get("/customer");

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);

    const customer1 = response.body.customers[0];
    expect(customer1.name).toBe("John");
    expect(customer1.address.street).toBe("Street");
    expect(customer1.address.city).toBe("Anytown");
    expect(customer1.address.number).toBe(123);
    expect(customer1.address.zip).toBe("12345");

    const customer2 = response.body.customers[1];
    expect(customer2.name).toBe("Jane");
    expect(customer2.address.street).toBe("Street 2");
    expect(customer2.address.city).toBe("Anytown 2");
    expect(customer2.address.number).toBe(1234);
    expect(customer2.address.zip).toBe("123456");
  });
});
