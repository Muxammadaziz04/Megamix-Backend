const { Model, DataTypes, Sequelize } = require("sequelize");

class ProductCategory extends Model {}

const ProductCategoryModel = (sequelize) => {
    try {
        ProductCategory.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            uz: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            ru: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            tr: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            tj: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            en: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            modelName: 'ProductCategory',
            timestamps: false
        })

        ProductCategory.accosiate = (models) => {
            ProductCategory.hasMany(models.Product, {
                foreignKey: 'productId'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = ProductCategoryModel