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
            modelName: 'Vacancy'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = VacancyModel