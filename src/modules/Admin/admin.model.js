const { Model, Sequelize, DataTypes } = require("sequelize");
const sha256 = require('sha256')

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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: "Admin",
            hooks: {
                beforeCreate: (model) => {
                    const values = model.dataValues
                    if(values?.password){
                        model.password = sha256(values.password)
                    }
                },
                beforeUpdate: (model) => {
                    const values = model.dataValues
                    if(model._previousDataValues?.password !== values?.password){
                        model.password = sha256(values.password)
                    }
                }
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = AdminModel