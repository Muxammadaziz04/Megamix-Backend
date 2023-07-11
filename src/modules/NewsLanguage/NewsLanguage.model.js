const { Model, DataTypes, Sequelize } = require("sequelize");
const { languages } = require("../../constants/server.constants");

class NewsLanguage extends Model {}

const NewsLanguageModel = (sequelize) => {
    try {
        NewsLanguage.init({
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
            modelName: 'NewsLanguage'
        })

        NewsLanguage.associate = (models) => {
            NewsLanguage.belongsTo(models.News, {
                foreignKey: {
                    name: 'newsId',
                    allowNull: false
                },
                as: 'news'
            })
        }

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = NewsLanguageModel