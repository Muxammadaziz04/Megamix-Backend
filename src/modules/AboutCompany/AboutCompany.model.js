const { Model, DataTypes, Sequelize } = require("sequelize");

class AboutCompany extends Model {}

const AboutCompanyModel = (sequelize) => {
    try {
        AboutCompany.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            }
        }, {
            sequelize,
            modelName: 'AboutCompany'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = AboutCompanyModel