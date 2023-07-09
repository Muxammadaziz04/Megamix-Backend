const { Sequelize } = require("sequelize");
const dbConfig = require("../configs/sequelize.config.js");

const sequelize = new Sequelize(dbConfig);

const connectToDB = async () => {
    try {
        await sequelize
            .authenticate()
            .then(async() => {
                console.log('DB connected!')
                Object.keys(sequelize.models).forEach(model => {
                    if (sequelize.models[model].associate){
                        sequelize.models[model].associate(sequelize.models)
                    }
                })
            })
            .catch((err) => {
                throw new Error(err);
            });

        if (process.env.NODE_ENV === "production") {
            sequelize.sync()
        } else {
            sequelize.sync({ alter: true })
        }
    } catch (error) {
        console.log(`Failed to connect db: ${error}`)
    }
};

module.exports = {
    connectToDB,
    sequelize,
};