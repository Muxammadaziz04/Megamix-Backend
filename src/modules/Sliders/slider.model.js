const { Model, DataTypes, Sequelize } = require("sequelize");

class Slider extends Model {}

const SliderModel = (sequelize) => {
    try {
        Slider.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            uz: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ru: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tr: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tj: {
                type: DataTypes.STRING,
                allowNull: false
            },
            en: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, {
            sequelize,
            modelName: 'Slider'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = SliderModel