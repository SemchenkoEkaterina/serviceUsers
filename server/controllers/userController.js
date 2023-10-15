const sequelize = require('../db');
const ApiError = require('../error/apiError');

class UserController {
    async create(req, res, next){
        try {
            const {name, email, password} = req.query;
            if (!password || !email) {
                return next(ApiError.badRequest('Некорректный email или password'));
            }
            const sql = `
    	INSERT INTO users (name, email, password)
    	VALUES ('${name}', '${email}', '${password}')
        RETURNING id, name
  		`;
          const newUser = await sequelize.query(sql, {
				type: sequelize.QueryTypes.INSERT
			});
			return res.json(newUser);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new UserController();