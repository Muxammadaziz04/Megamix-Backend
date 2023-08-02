const { Model, DataTypes, Sequelize } = require("sequelize");
const { languages } = require("../../constants/server.constants");

class ClubLanguage extends Model {}

const ClubLanguageModel = (sequelize) => {
    try {
        ClubLanguage.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            title: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            },
            lang: {
                type: DataTypes.ENUM(languages),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'ClubLanguage'
        })

        ClubLanguage.associate = (models) => {
            ClubLanguage.belongsTo(models.Club, {
                foreignKey: {
                    name: 'clubId',
                    allowNull: false
                },
                as: 'club'
            })
        }

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = ClubLanguageModel