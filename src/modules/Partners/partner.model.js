const { Model, DataTypes, Sequelize } = require("sequelize");

class Partner extends Model { }

const PartnerModel = (sequelize) => {
    try {
        Partner.init({
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
                    isUrl: true
                }
            }
        }, {
            sequelize,
            modelName: 'Partner',
            timestamps: false
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = PartnerModel