const { Model, DataTypes, Sequelize } = require("sequelize");

class Name extends Model {}

const NameModel = (sequelize) => {
    try {
        Name.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            }
        }, {
            sequelize,
            modelName: 'Name'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = NameModel