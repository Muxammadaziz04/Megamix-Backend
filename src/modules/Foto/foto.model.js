const { Model, DataTypes, Sequelize } = require("sequelize");

class Foto extends Model {}

const FotoModel = (sequelize) => {
    try {
        Foto.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            uz: {
                type: DataTypes.STRING
            },
            ru: {
                type: DataTypes.STRING
            },
            en: {
                type: DataTypes.STRING
            },
            tr: {
                type: DataTypes.STRING
            },
            tj: {
                type: DataTypes.STRING
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.STRING)
            }
        }, {
            sequelize,
            modelName: 'Foto'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = FotoModel