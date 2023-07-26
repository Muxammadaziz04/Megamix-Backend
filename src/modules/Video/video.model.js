const { Model, DataTypes, Sequelize } = require("sequelize");

class Video extends Model {}

const VideoModel = (sequelize) => {
    try {
        Video.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            uz: {
                type: DataTypes.STRING
            },
            ru: {
                type: DataTypes.STRING
            },
            en: {
                type: DataTypes.STRING
            },
            tr: {
                type: DataTypes.STRING
            },
            tj: {
                type: DataTypes.STRING
            },
            video: {
                type: DataTypes.STRING
            }
        }, {
            sequelize,
            modelName: 'Video'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = VideoModel