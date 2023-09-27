module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define('user', {

        Name: {
            type: Sequelize.STRING,

        },
        Email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        Password: {
            type: Sequelize.STRING,

        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }

    });
    return users
}