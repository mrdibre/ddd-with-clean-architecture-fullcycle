import { OrderItem } from "./order-item";

export class Order {
  private readonly _id: string;
  private readonly _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validate()
  }

  private validate() {
    if (!this._id) {
      throw new Error("Id is required");
    }
    if (!this._customerId) {
      throw new Error("CustomerId is required");
    }
    if (!this._items.length) {
      throw new Error("Items qtd must be greater than 0");
    }
  }

  total() {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }
}
