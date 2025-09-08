import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/connection';
import Points from './points';


interface WilayahAttr{
    id:number;
    title:string;
    created_at?: Date;
    updated_at?: Date;
}

interface WilayahCreateAttr extends Optional<WilayahAttr, 'id' |   'created_at' | 'updated_at'> {}

class Wilayah extends Model<WilayahAttr, WilayahCreateAttr> implements WilayahAttr {
  public id!: number; 
  public title!: string; 
  public created_at?: Date;
  public updated_at?: Date;
}


Wilayah.init({
     id:  {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true
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
    modelName: 'Wilayah',
    tableName: 'tbl_wilayah',
    timestamps: true,   
    createdAt: 'created_at',     
    updatedAt: 'updated_at',
    underscored: true,
  }
)

// Wilayah.hasMany(Points, { foreignKey: 'tbl_wilayah_id', as: 'points' });

export default Wilayah;