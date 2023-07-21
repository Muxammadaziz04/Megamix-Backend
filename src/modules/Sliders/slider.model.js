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
            }
        }, {
            sequelize,
            modelName: 'Slider'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = SliderModel