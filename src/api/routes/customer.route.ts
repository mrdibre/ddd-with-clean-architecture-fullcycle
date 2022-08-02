import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../usecase/customer/create/create.customer";
import { CustomerRepository } from "../../infrastructure/customer/repository/customer-repository";
import { InputCreateCustomerDto } from "../../usecase/customer/create/create.customer.dto";
import { ListCustomerUseCase } from "../../usecase/customer/list/list.customer";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const repository = new CustomerRepository();
  const useCase = new CreateCustomerUseCase(repository);

  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        zip: req.body.address.zip,
        city: req.body.address.city,
        street: req.body.address.street,
        number: req.body.address.number
      },
    };

    const output = await useCase.execute(customerDto);

    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
})

customerRoute.get("/", async (req: Request, res: Response) => {
  const repository = new CustomerRepository();
  const useCase = new ListCustomerUseCase(repository);

  try {
    const output = await useCase.execute({});

    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});
