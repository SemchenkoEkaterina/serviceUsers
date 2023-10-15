const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
})

const HistoriesUser = sequelize.define('histories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    inf: {type: DataTypes.STRING},
})

const UserHistories = sequelize.define('user_histories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

Users.belongsToMany(HistoriesUser, {through: UserHistories});

module.exports = {
    Users,
    HistoriesUser,
    UserHistories
}