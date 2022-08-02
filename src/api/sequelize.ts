import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../infrastructure/customer/model/customer.model";

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  await sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}

setupDb();
