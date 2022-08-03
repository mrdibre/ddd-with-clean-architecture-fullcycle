import { Notification } from "../notification/notification";

export abstract class EntityAbstract {
  protected _id: string;
  public notification: Notification;

  protected constructor(defaultContext?: string) {
    this.notification = new Notification(defaultContext);
  }
}
