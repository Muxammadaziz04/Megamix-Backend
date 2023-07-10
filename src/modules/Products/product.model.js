const { Model, DataTypes, Sequelize } = require("sequelize");

class Product extends Model {}

const ProductModel = (sequelize) => {
    try {
        Product.init({
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
        }, {
            sequelize,
            modelName: 'Product',
        })

        Product.associate = (models) => {
            Product.belongsTo(models.ProductCategory, {
                foreignKey: {
                    name: 'categoryId',
                    allowNull: false
                },
                as: 'category'
            })

            Product.hasMany(models.ProductLanguage, {
                foreignKey: {
                    name: "productId",
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

module.exports = ProductModel