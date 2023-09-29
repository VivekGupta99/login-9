module.exports = (sequelize, Sequelize) => {
    const expanses = sequelize.define('expanse', {
        amount: {
            type: Sequelize.FLOAT,
            validate: {
                isFloat: true
            }
        },
        description: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    })
    return expanses;
}