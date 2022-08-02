import { Error } from "sequelize";
import { NotificationErrorProps } from "./notification";

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[], public defaultContext?: string) {
    super(`${defaultContext}: ${errors.map(error => error.message).join(", ")}`);
  }
}
