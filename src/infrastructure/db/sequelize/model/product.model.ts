//this file will represent the product in the database

import { Model, Table, PrimaryKey, Column } from "sequelize-typescript";    

@Table({
    tableName: 'products',
    timestamps: false
})
export default class ProductModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;
}