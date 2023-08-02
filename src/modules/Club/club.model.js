const { Model, DataTypes, Sequelize } = require("sequelize");

class Club extends Model { }

const ClubModel = (sequelize) => {
    try {
        Club.init({
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
                validate: {
                    notNull: {
                        msg: 'Добавьте фото для продукта'
                    }
                }
            }
        }, {
            sequelize,
            modelName: 'Club'
        })

        Club.associate = (models) => {
            Club.hasMany(models.ClubLanguage, {
                foreignKey: {
                    name: 'clubId',
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

module.exports = ClubModel