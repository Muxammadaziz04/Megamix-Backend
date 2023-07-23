const { Model, DataTypes, Sequelize } = require("sequelize");
const { languages } = require("../../constants/server.constants");

class ProductLanguage extends Model {}

const ProductLanguageModel = (sequelize) => {
    try {
        ProductLanguage.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            shortDescription: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.TEXT,   
            },
            technicalSpecifications: {
                type: DataTypes.TEXT,
            },
            packaging: {
                type: DataTypes.TEXT,
            },
            lang: {
                type: DataTypes.ENUM(languages),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'ProductLanguage',
            timestamps: false
        })

        ProductLanguage.associate = (models) => {
            ProductLanguage.belongsTo(models.Product, {
                foreignKey: {
                    name: 'productId',
                    allowNull: false
                },
                as: 'product'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = ProductLanguageModel