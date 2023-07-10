const { Model, DataTypes, Sequelize } = require("sequelize");

class Feedback extends Model {}

const FeedbackModel = (sequelize) => {
    try {
        Feedback.init({
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
            description: {
                type: DataTypes.TEXT,
            }
        }, {
            sequelize,
            modelName: 'Feedback'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = FeedbackModel