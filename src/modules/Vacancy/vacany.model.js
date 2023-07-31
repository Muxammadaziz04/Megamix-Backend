const { Model, DataTypes, Sequelize } = require("sequelize");

class Vacancy extends Model {}

const VacancyModel = (sequelize) => {
    try {
        Vacancy.init({
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
            salary: {
                type: DataTypes.STRING
            }
        }, {
            sequelize,
            modelName: 'Vacancy'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = VacancyModel