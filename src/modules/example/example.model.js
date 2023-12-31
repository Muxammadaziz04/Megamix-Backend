const { Model, DataTypes, Sequelize } = require("sequelize");

class ExampleCompany extends Model {}

const ExampleCompanyModel = (sequelize) => {
    try {
        ExampleCompany.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            }
        }, {
            sequelize,
            modelName: 'ExampleCompany'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = ExampleCompanyModel