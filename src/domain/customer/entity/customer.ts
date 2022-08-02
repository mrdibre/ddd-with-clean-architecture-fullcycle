import { Address } from "../value-object/address";
import { EntityAbstract } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification-error";

export class Customer extends EntityAbstract {
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super("customer");

    this._id = id;
    this._name = name;
    this.validate()
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({ message: "Id is required" });
    }
    if (this._name.length === 0) {
      this.notification.addError({ message: "Name is required" });
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors(), "customer");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive() {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  get active(): boolean {
    return this._active;
  }

  get id(): string {
    return super._id;
  }
}
