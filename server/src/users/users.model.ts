import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAttributes {
  name: string;
  email: string;
  password: string;
  isBlocked?: boolean;
  role?: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isBlocked: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'USER',
  })
  role: string;
}
