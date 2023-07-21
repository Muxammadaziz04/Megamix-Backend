const { Model, DataTypes, Sequelize } = require("sequelize");
const { default: slugify } = require("slugify");
const slugifyConfig = require("../../configs/slugify.config");

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
                allowNull: false,
                unique: {
                    arg: true,
                    msg: 'Название продукта должен быть уникальным! Пожалуйста придумайте другое название.'
                }
            },
            foto: {
                type: DataTypes.STRING
            },
            video: {
                type: DataTypes.STRING
            },
            weight: {
                type: DataTypes.STRING
            },
            compressiveStrength: {
                type: DataTypes.STRING
            },
            mixinWithWater: {
                type: DataTypes.STRING
            },
            workingMediumTemperature: {
                type: DataTypes.STRING
            },
            calcLayerWidth: {
                type: DataTypes.INTEGER
            },
            calcVolume: {
                type: DataTypes.INTEGER
            },
            calcWaterQuantity: {
                type: DataTypes.INTEGER
            },
            calcWeight: {
                type: DataTypes.INTEGER
            },
            slug: {
                type: DataTypes.STRING,
            }
        }, {
            sequelize,
            modelName: 'Product',
            hooks: {
                beforeCreate: (model) => {
                    const values = model.dataValues
                    model.slug = slugify(values?.title || '', slugifyConfig)
                },
                beforeUpdate: (model) => {
                    const values = model.dataValues
                    model.slug = slugify(values?.title || '', slugifyConfig)
                },
            }
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