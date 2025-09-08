import Wilayah from './wilayah';
import Points from './points';

// Definisikan relasi di sini
Wilayah.hasMany(Points, { foreignKey: 'tbl_wilayah_id', as: 'points' });
Points.belongsTo(Wilayah, { foreignKey: 'tbl_wilayah_id', as: 'wilayah' });

export { Wilayah, Points };