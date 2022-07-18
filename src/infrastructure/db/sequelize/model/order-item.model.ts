import { Column, ForeignKey, Model, BelongsTo, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";

@Table({ tableName: 'order_items', timestamps: false })
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: string;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel
}
