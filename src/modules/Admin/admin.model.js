const { Model, Sequelize, DataTypes } = require("sequelize");

class Admin extends Model { }

const AdminModel = (sequelize) => {
    try {
        Admin.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: "Admin"
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = AdminModel