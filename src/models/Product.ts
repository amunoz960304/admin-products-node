import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'products',
})
class Product extends Model {

  @Column({
    type: DataType.STRING(100),
  })
  declare public name: string;

  @Column({
    type: DataType.FLOAT,
  })
  declare public price: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare public availability: boolean;
}

export default Product;
