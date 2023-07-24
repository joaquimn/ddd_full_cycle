import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany
} from "sequelize-typescript";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "customers",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo (() => OrderModel)
  declare customer: OrderModel;

  @HasMany (() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}