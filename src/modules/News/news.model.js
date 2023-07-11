const { Model, DataTypes, Sequelize } = require("sequelize");

class News extends Model {}

const NewsModel = (sequelize) => {
    try {
        News.init({
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
            modelName: 'News'
        })

        News.associate = (models) => {
            News.hasMany(models.NewsLanguage, {
                foreignKey: {
                    name: 'newsId',
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

module.exports = NewsModel