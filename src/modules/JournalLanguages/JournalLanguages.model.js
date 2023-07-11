const { Model, DataTypes, Sequelize } = require("sequelize");
const { languages } = require("../../constants/server.constants");

class JournalLanguage extends Model {}

const JournalLanguageModel = (sequelize) => {
    try {
        JournalLanguage.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            lang: {
                type: DataTypes.ENUM(languages),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'JournalLanguage'
        })

        JournalLanguage.associate = (models) => {
            JournalLanguage.belongsTo(models.Journal, {
                foreignKey: {
                    name: 'journalId',
                    allowNull: false
                },
                as: 'journal'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = JournalLanguageModel