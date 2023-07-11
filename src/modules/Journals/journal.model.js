const { Model, DataTypes, Sequelize } = require("sequelize");

class Journal extends Model {}

const JournalModel = (sequelize) => {
    try {
        Journal.init({
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
            pdf: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: 'Journal'
        })

        Journal.associate = (models) => {
            Journal.hasMany(models.JournalLanguage, {
                foreignKey: {
                    name: 'journalId',
                    allowNull: false
                },
                as: 'languages',
                onDelete: 'cascade'
            })
        }

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = JournalModel