import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/connection';

// Define attributes interface
interface UserAttributes {
  id: number;
  name: string;
  title: string;
  phone: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define optional attributes for creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public title!: string;
  public phone!: string;
  public email!: string;
  public created_at?: Date;
  public updated_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE, // ✅ Tambahkan field ini
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE, // ✅ Tambahkan field ini
      allowNull: true,
    }
  },
  {
    sequelize: db.getSequelize(),
    modelName: 'User',
    tableName: 'users',
    timestamps: true,              // ✅ Gunakan timestamp otomatis
    createdAt: 'created_at',       // ✅ Mapping ke nama kolom di DB
    updatedAt: 'updated_at',
    underscored: true,
  }
);

export default User;
