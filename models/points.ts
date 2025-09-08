import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/connection';
import Wilayah from './wilayah'; 

interface PointsAttr{
    id:number;
    tbl_wilayah_id: number;
    title:string;
    alamat:string;
    created_at?: Date;
    updated_at?: Date;
}

interface PointsCreateAttr extends Optional<PointsAttr, 'id' |   'created_at' | 'updated_at'> {}

class Points extends Model<PointsAttr, PointsCreateAttr> implements PointsAttr {
  public id!: number; 
  public tbl_wilayah_id!: number;
  public title!: string; 
  public alamat!: string; 
  public created_at?: Date;
  public updated_at?: Date;
}


Points.init({
      id:  {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tbl_wilayah_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'tbl_wilayah', // nama tabel
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      alamat: {
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
    modelName: 'Points',
    tableName: 'tbl_points',
    timestamps: true,   
    createdAt: 'created_at',     
    updatedAt: 'updated_at',
    underscored: true,
  }
)

// Points.belongsTo(Wilayah, { foreignKey: 'tbl_wilayah_id', as: 'wilayah' });


export default Points;