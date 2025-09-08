import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/connection';


interface ArmadaAttr{
    id:number;
    title:string;
    created_at?: Date;
    updated_at?: Date;
}

interface ArmadaCreateAttr extends Optional<ArmadaAttr, 'id' |   'created_at' | 'updated_at'> {}

class Armada extends Model<ArmadaAttr, ArmadaCreateAttr> implements ArmadaAttr {
  public id!: number; 
  public title!: string; 
  public created_at?: Date;
  public updated_at?: Date;
}


Armada.init({
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
    modelName: 'Armada',
    tableName: 'tbl_armada',
    timestamps: true,   
    createdAt: 'created_at',     
    updatedAt: 'updated_at',
    underscored: true,
  }
)

export default Armada;