const { Model, DataTypes, Sequelize } = require("sequelize");

class Users extends Model {}

const UsersModel = (sequelize) => {
    try {
        Users.init({
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
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, {
            sequelize,
            modelName: 'Users'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = UsersModel